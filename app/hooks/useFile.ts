import { fileOpen, supported, type FileWithHandle } from "browser-fs-access";
import { useEffect, useState } from "react";

export const useFile = (mimeTypes: string[]) => {
  const [fileWithHandle, setFileWithHandle] = useState<FileWithHandle | null>(
    null,
  );
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(supported);
  }, [supported]);

  const open = async () => {
    setFileWithHandle(null);
    const file = await fileOpen({ mimeTypes });
    setFileWithHandle(file);
  };

  return {
    isSupported,
    fileWithHandle,
    open,
    reset: () => setFileWithHandle(null),
  };
};
