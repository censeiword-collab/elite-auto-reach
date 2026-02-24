import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
};

function wrapSelection(text: string, start: number, end: number, before: string, after: string) {
  const selected = text.slice(start, end);
  const next = text.slice(0, start) + before + selected + after + text.slice(end);
  const cursor = start + before.length + selected.length + after.length;
  return { next, cursor };
}

export default function HtmlMiniEditor({ value, onChange, rows = 10 }: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const apply = (before: string, after: string) => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const { next, cursor } = wrapSelection(value || "", start, end, before, after);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursor, cursor);
    });
  };

  const applyLink = () => apply(`<a href="https://">`, `</a>`);
  const applyP = () => apply(`<p>`, `</p>`);
  const applyH2 = () => apply(`<h2>`, `</h2>`);
  const applyH3 = () => apply(`<h3>`, `</h3>`);
  const applyB = () => apply(`<b>`, `</b>`);
  const applyI = () => apply(`<i>`, `</i>`);
  const applyU = () => apply(`<u>`, `</u>`);
  const applyS = () => apply(`<s>`, `</s>`);
  const applyQuote = () => apply(`<blockquote>`, `</blockquote>`);
  const applyUl = () => apply(`<ul>\n<li>`, `</li>\n</ul>`);
  const applyOl = () => apply(`<ol>\n<li>`, `</li>\n</ol>`);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={applyP}>P</Button>
        <Button type="button" variant="outline" size="sm" onClick={applyH2}>H2</Button>
        <Button type="button" variant="outline" size="sm" onClick={applyH3}>H3</Button>
        <Button type="button" variant="outline" size="sm" onClick={applyB}><b>B</b></Button>
        <Button type="button" variant="outline" size="sm" onClick={applyI}><i>I</i></Button>
        <Button type="button" variant="outline" size="sm" onClick={applyU}><u>U</u></Button>
        <Button type="button" variant="outline" size="sm" onClick={applyS}><s>S</s></Button>
        <Button type="button" variant="outline" size="sm" onClick={applyQuote}>Quote</Button>
        <Button type="button" variant="outline" size="sm" onClick={applyUl}>• List</Button>
        <Button type="button" variant="outline" size="sm" onClick={applyOl}>1. List</Button>
        <Button type="button" variant="outline" size="sm" onClick={applyLink}>Link</Button>
      </div>

      <Textarea
        ref={ref}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Пиши HTML здесь. Разрешённые теги: p,a,b,i,u,s,h1-h4,blockquote,ul/ol/li,figure/img/figcaption,br`}
      />
    </div>
  );
}
