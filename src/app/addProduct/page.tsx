"use client";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports

import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState, type FormEvent } from "react";
import { useDropzone } from "react-dropzone";
import { CreateProduct } from "~/actions/actions";
import { ListInput } from "~/components/ListInput";
import { MaxWidthWrapper } from "~/components/MaxWidthWrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

interface FileWithPreview extends File {
  preview?: string;
}

export default function AddListingPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  // const [f, setF] = useState<File[]>([]);
  const hightlightsState = useState<string[]>([""]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    for (const file of acceptedFiles) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("Only jpeg and png files are allowed");
        return;
      } else {
        setFiles((prev) => [
          ...prev,
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ]);
      }
    }
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSumbmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (files.length === 0) return alert("Please upload atleast one image");
    const data = new FormData(document.querySelector("form")!);
    files.forEach((file) => {
      delete file.preview;
      data.append("images", file);
    });

    if (
      data.get("product_name") === "" ||
      data.get("mrp") === "" ||
      data.get("selling_price") === "" ||
      data.get("description") === ""
    )
      return alert("Please fill all the fields");

    hightlightsState[0].forEach((highlight) => {
      data.append("highlights", highlight);
    });
    const product = await CreateProduct(data);
    console.log(product);
    // await CreateProduct(data);
    // await CreateProduct(product);
    // redirect("/");
  };
  const className = "border-2  rounded w-full p-4 py-8";
  return (
    <MaxWidthWrapper className="flex flex-col mt-8">
      <div className=" flex bg-white w-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full flex-col items-center justify-start p-6">
              <div className=" flex flex-wrap gap-4">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={file.preview!}
                      className=" h-32 w-32 object-contain"
                      alt="preview"
                      width={128}
                      height={128}
                    />
                    <div>
                      <button
                        className="absolute -right-2 -top-2 rounded-full border bg-red-600 p-1"
                        onClick={() => {
                          setFiles((prev) => {
                            const newFiles = [...prev];
                            newFiles.splice(index, 1);
                            return newFiles;
                          });
                        }}
                      >
                        <X stroke="white" strokeWidth={3} size={16} />
                      </button>
                    </div>
                    {/* <div>{file.name}</div> */}
                  </div>
                ))}
              </div>
              <div {...getRootProps({ className: className })}>
                {files.length <= 5 ? (
                  <div>
                    <input {...getInputProps({ className: className })} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>
                        Drag &apos;n&apos; drop some files here, or click to
                        select files
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p>Only 5 files are allowed</p>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <form
              className="flex h-full w-full flex-col items-start gap-4 p-6"
              onSubmit={onSumbmit}
            >
              <div className="flex items-center justify-center gap-4">
                <div className="input-label">Product Name</div>
                <input
                  className="rounded-lg border-2 p-2 outline-none focus:border-blue-600"
                  type="text"
                  name="product_name"
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="input-label">MRP</div>
                <input
                  className="rounded-lg border-2 p-2 outline-none focus:border-blue-600"
                  type="number"
                  name="mrp"
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="input-label">Selling Price</div>
                <input
                  className="rounded-lg border-2 p-2 outline-none focus:border-blue-600"
                  type="number"
                  name="selling_price"
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="input-label">Description</div>
                <textarea
                  className="rounded-lg border-2 p-2 outline-none focus:border-blue-600"
                  name="description"
                />
              </div>
              <div className="flex items-start justify-center gap-4">
                <div className="input-label">Hightlights</div>
                <ListInput
                  placeholder="Enter Highlight"
                  listState={hightlightsState}
                />
              </div>

              <button
                className="rounded-lg border-2 p-2 outline-none focus:border-blue-600"
                type="submit"
              >
                Submit
              </button>
            </form>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </MaxWidthWrapper>
  );
}
