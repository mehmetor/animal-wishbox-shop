import { Components } from "react-markdown";

const MarkdownComponentStyles: Components = {
  h1: ({node, ...props}) => (
    <h1 className="text-xl font-semibold mb-3 mt-5" {...props} />
  ),
  h2: ({node, ...props}) => (
    <h2 className="text-lg font-semibold mb-2 mt-4" {...props} />
  ),
  h3: ({node, ...props}) => (
    <h3 className="text-base font-semibold mb-2 mt-3" {...props} />
  ),
  hr: ({node, ...props}) => (
    <hr className="my-4" {...props} />
  ),
  li: ({node, ...props}) => (
    <li className="mb-1" {...props} />
  ),
  ul: ({node, ...props}) => (
    <ul className="list-disc pl-5 mb-3" {...props} />
  ),
  ol: ({node, ...props}) => (
    <ol className="list-decimal pl-5 mb-3" {...props} />
  ),
  p: ({node, ...props}) => (
    <p className="mb-3" {...props} />
  ),
  a: ({node, ...props}) => (
    <a 
      className="text-blue-600 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
};

export default MarkdownComponentStyles;
