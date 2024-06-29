// wrapper.tsx
import { insecureAuthToken } from "electric-sql/auth";
import { makeElectricContext } from "electric-sql/react";
import { ElectricDatabase, electrify } from "electric-sql/wa-sqlite";
import { useEffect, useState } from "react";
import { Electric, schema } from "./generated/client";

const { ElectricProvider, useElectric } = makeElectricContext<Electric>();

type ElectricWrapperProps = {
  children: React.ReactNode;
};

export const ElectricWrapper: React.FC<ElectricWrapperProps> = ({
  children,
}) => {
  const [electric, setElectric] = useState<Electric>();

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const conn = await ElectricDatabase.init("electric.db");
      const electric = await electrify(conn, schema);
      const token = insecureAuthToken({ sub: "dummy" });
      await electric.connect(token);

      if (!isMounted) {
        return;
      }

      setElectric(electric);
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  if (electric === undefined) {
    return null;
  }

  return <ElectricProvider db={electric}>{children}</ElectricProvider>;
};
