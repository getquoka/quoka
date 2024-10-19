import { fileOpen, supported, type FileWithHandle } from "browser-fs-access";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";

export const useFile = (mimeTypes: string[]) => {
  const [fileWithHandle, setFileWithHandle] = useState<FileWithHandle | null>(
    null,
  );
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    setIsSupported(supported);
  }, [supported]);

  useEffect(() => {
    const handleFileChange = async () => {
      setIsLoading(true);
      const text = await fileWithHandle?.text();
      if (text) setContent(text);
      setIsLoading(false);
    };

    handleFileChange();
  }, [fileWithHandle?.lastModified]);

  const open = async () => {
    setFileWithHandle(null);
    const file = await fileOpen({ mimeTypes, startIn: "desktop" });
    setFileWithHandle(file);
  };

  const reload = async () => {
    if (fileWithHandle && fileWithHandle.handle) {
      console.log("Reloading file", fileWithHandle.name);
      const file = await fileWithHandle.handle.getFile();
      setContent(await file.text());
    }
  };

  const intervalInMs = fileWithHandle ? 100 : null;
  useInterval(reload, intervalInMs);

  return {
    isSupported,
    fileWithHandle,
    content,
    isLoading,
    reload,
    open,
    reset: () => setFileWithHandle(null),
  };
};
