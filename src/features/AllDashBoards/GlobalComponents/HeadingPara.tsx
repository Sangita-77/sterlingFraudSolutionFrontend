// Headings Start
export const Heading1 = ({ text }: { text: string }) => (
  <h1 className="PageTitle">{text}</h1>
);
export const Heading2 = ({ text }: { text: string }) => (
  <h2 className="PageTitle">{text}</h2>
);
// Headings End


// Paragraphs Start
export const Paragraph = ({ text }: { text: string }) => (
  <p className="PageDescription">{text}</p>
);
// Paragraphs End


// List Start
interface ListProps {
  items: string[];
  className?: string;
}
export const UnorderedList = ({
  items,
}: ListProps) => (
  <ul className="UnorderList">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
// List End