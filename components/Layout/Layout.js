import { gql, useQuery } from "@apollo/client";
import * as MENUS from "../../constants/menus";
import { BlogInfoFragment } from "../../fragments/GeneralSettings";
import { DesktopNav } from "../DesktopNav";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { HeaderHero } from "../HeaderHero";
import { SEO } from "../SEO";

export default function Layout({ body, featuredImage, headerHero = false }) {
  // console.log(body);
  // console.log(siteTitle);
  // console.log(siteDescription);

  const { data, loading, error } = useQuery(Layout.query, {
    variables: Layout.variables(),
  });

  if (loading) {
    return (
      <div className="bg-gray-300 w-screen h-screen relative">
        <div className="absolute left-1/2 top-1/2">
          {/* <Spinner className="h-16 w-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" /> */}
        </div>
      </div>
    );
  }

  const { title: siteTitle2, description: siteDescription2 } =
    data?.generalSettings;
  const primaryMenu2 = data?.headerMenuItems?.nodes ?? [];
  const footerMenu2 = data?.footerMenuItems?.nodes ?? [];

  // console.log(primaryMenu2);

  return (
    <>
      <SEO
        title={siteTitle2}
        description={siteDescription2}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      {headerHero ? (
        <HeaderHero menuItems={primaryMenu2} />
      ) : (
        <Header menuItems={primaryMenu2} />
      )}
      <main>{body}</main>
      <Footer title={siteTitle2} menuItems={footerMenu2} />
    </>
  );
}

Layout.query = gql`
  ${BlogInfoFragment}
  ${DesktopNav.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }

    headerMenuItems: menuItems(
      where: { location: $headerLocation }
      first: 50
    ) {
      nodes {
        ...DesktopNavMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...DesktopNavMenuItemFragment
      }
    }
  }
`;

Layout.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
