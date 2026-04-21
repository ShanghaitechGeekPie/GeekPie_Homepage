import { footerSocials } from "@/statics/home";
import { ContactRedirect } from "./redirect";

export function generateStaticParams() {
  return footerSocials.filter((item) => item.mask).map((item) => ({ name: item.name }));
}

const contactMap = Object.fromEntries(
  footerSocials.map((item) => [item.name, item.href])
);

export default async function ContactPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const target = contactMap[name];
  return <ContactRedirect target={target} />;
}
