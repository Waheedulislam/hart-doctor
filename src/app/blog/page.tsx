import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";

const page = () => {
  return (
    <div>
      {/* page header  */}
      <div className="mb-20">
        <NMPageHeader
          title="Our Blog"
          backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Blog" }]}
        />
      </div>
    </div>
  );
};

export default page;
