import { Hero, Layout } from "../components";

const PageData = () => {
  return (
    <div className="">
      <Hero title={"Front Page"} />
      <div className="text-center">
        <p>This page is utilizing the "front-page" WordPress template.</p>
        <code>wp-templates/front-page.js</code>
      </div>
    </div>
  );
};

export default function FrontPage() {
  const featuredImage = null;

  return (
    <Layout
      body={PageData()}
      featuredImage={featuredImage?.node?.sourceUrl}
      headerHero={true}
    />
  );
}
