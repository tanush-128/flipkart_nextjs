
##### DEPENDENCIES

FROM --platform=linux/amd64 node:20-alpine AS deps
# RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

# Install Prisma Client - remove if not using Prisma

COPY prisma ./

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN npm i

##### BUILDER

FROM --platform=linux/amd64 node:20-alpine AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# RUN \
#     if [ -f yarn.lock ]; then  yarn build; \
#     elif [ -f package-lock.json ]; then npm run build; \
#     elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm run build; \
#     else echo "Lockfile not found." && exit 1; \
#     f

##### RUNNER

FROM --platform=linux/amd64 gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app

ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

ENV DATABASE_URL "postgresql://tanush-128:RaiDz35bmBhe@ep-jolly-shadow-a5492ntx.us-east-2.aws.neon.tech/test?sslmode require"
ENV NEXTAUTH_URL "https://flipkart-nextjs.azurewebsites.net/"
ENV NEXTAUTH_SECRET   "my_secret_2"
ENV GOOGLE_ID   "42552123265-msoo43qqlhvchgc5hpg85iidj9a4eq4e.apps.googleusercontent.com"
ENV GOOGLE_SECRET   "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"
ENV EMAIL_SERVER_USER "tanuedu128@gmail.com"
ENV EMAIL_SERVER_PASSWORD "nvxg kzdm ukoi cpzo"
ENV EMAIL_SERVER_HOST "smtp.gmail.com"
ENV EMAIL_SERVER_PORT 587
ENV EMAIL_FROM "tanuedu128@gmail.com"
ENV EXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "pk_test_51OZSLcSBdAwnbvAQpef9nUppsf7e8cuLzpMFeiKLPsrbcxLFd2nVevwHF8il9VHzNVhnfh29dcxCG44yn8xCwRCx00ShjHuTOS"
ENV STRIPE_SECRET_KEY "sk_test_51OZSLcSBdAwnbvAQpvDgThYH1iBs61hxC0utVmoFgjQdy478xXhg2akHeeL45OK0Q63OlnWCQk0Ldby4aInrQcU600X43ZSEC4"


CMD ["server.js"]