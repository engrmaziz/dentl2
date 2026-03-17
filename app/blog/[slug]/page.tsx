import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} | Dentl Blog` };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <main><h1>{slug}</h1></main>;
}
