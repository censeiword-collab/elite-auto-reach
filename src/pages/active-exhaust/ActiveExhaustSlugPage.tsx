import { useParams } from "react-router-dom";
import { resolveExhaustSlug } from "@/data/activeExhaustUtils";
import ActiveExhaustBrandPage from "./ActiveExhaustBrandPage";
import ActiveExhaustModelPage from "./ActiveExhaustModelPage";
import ActiveExhaustAreaPage from "./ActiveExhaustAreaPage";
import NotFound from "@/pages/NotFound";

/**
 * Slug resolver page: determines if the slug is a brand, model, or area
 * and renders the appropriate page component.
 */
const ActiveExhaustSlugPage = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <NotFound />;

  const resolved = resolveExhaustSlug(slug);
  if (!resolved) return <NotFound />;

  if (resolved.type === "brand") {
    return <ActiveExhaustBrandPage brandSlug={resolved.brandSlug} />;
  }

  if (resolved.type === "area") {
    return <ActiveExhaustAreaPage areaSlugOverride={resolved.areaSlug} />;
  }

  return <ActiveExhaustModelPage brandSlug={resolved.brandSlug} modelSlug={resolved.modelSlug} />;
};

export default ActiveExhaustSlugPage;
