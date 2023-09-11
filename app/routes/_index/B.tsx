import { useFetcher } from "react-router-dom";

let savedMessage = "goodbye";

export interface Data {
  message: string;
}

export const loader = (): Promise<Data> => {
  return Promise.resolve({
    message: savedMessage,
    loadedAt: Date.now(),
  });
};

export const action = async (formData: FormData): Promise<void> => {
  if (formData.get("section") !== "b") return;

  savedMessage = formData.get("message")?.toString() ?? "";
};

export default function B({ data }: { data: Data }) {
  const fetcher = useFetcher();

  return (
    <div>
      <h1>B</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <fetcher.Form method="post">
        <label>
          New message
          <input name="message" defaultValue={data.message} />
        </label>

        <button name="section" value="b" type="submit">
          Save
        </button>
      </fetcher.Form>
    </div>
  );
}
