import { useParams } from "react-router-dom";

export default function RadioDetail() {
  const { slug } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">
        {slug.replace("-", " ")}
      </h1>
      <p className="mt-2 text-gray-600">
        Now playing {slug.replace("-", " ")}
      </p>
    </div>
  );
}