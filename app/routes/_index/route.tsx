import { useLoaderData } from "react-router";
import A, { loader as loaderA, action as actionA } from "./A";
import type { Data as DataA } from "./A";
import B, { loader as loaderB, action as actionB } from "./B";
import type { Data as DataB } from "./B";
import type { ActionArgs } from "@remix-run/node";

type Data = {
  a: DataA;
  b: DataB;
};

export const loader = async (): Promise<Data> => {
  return {
    a: await loaderA(),
    b: await loaderB(),
  };
};

export const action = async ({ request }: ActionArgs): Promise<null> => {
  const formData = await request.formData();
  await Promise.all([actionA, actionB].map((action) => action(formData)));
  return null;
};

export default function Index() {
  const { a, b } = useLoaderData() as Data;

  return (
    <>
      <A data={a} />
      <B data={b} />
    </>
  );
}
