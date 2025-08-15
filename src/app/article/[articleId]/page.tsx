import { ArticleDetails } from "@/components/modules/Article/ArticleDetails/ArticleDetaills";
import { getSingleArticle } from "@/services/Article";

const articleDetailsPage = async ({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) => {
  const { articleId } = await params;
  const { data: article } = await getSingleArticle(articleId);

  return (
    <div>
      <ArticleDetails article={article} />
    </div>
  );
};

export default articleDetailsPage;
