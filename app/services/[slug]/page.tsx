import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import ServiceDetailClient from "./ServiceDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found | Dentl Clinic" };
  return {
    title: `${service.name} | Dentl Clinic`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServiceDetailClient service={service} />;
}
