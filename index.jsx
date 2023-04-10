export default function Test() {
  const text = "Petch";
  return <div className="Test">{text}</div>;
}

document
  .getElementById("test")
  .innerHTML('<div class="Test" onclick=""></div>');
