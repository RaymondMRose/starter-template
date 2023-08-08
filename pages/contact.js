import { gql, useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import {
  EntryHeader,
  Footer,
  Header,
  NavigationMenu,
  SEO,
} from "../components";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import ContactUsForm from "../components/Forms/ContactForm/ContactForm";

export default function Page(props) {
  const { data, loading, error } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  if (loading) {
    return (
      <div className="bg-gray-700 w-screen h-screen relative">
        <div className="absolute left-1/2 top-1/2">
          <Spinner className="h-16 w-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
        </div>
      </div>
    );
  }

  const title = props.title;
  // console.log(data);

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO
        title={title + " - " + siteTitle + " - " + siteDescription}
        description={siteDescription}
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <EntryHeader title={title} image={false} />
      <main className="relative z-0">
        <div className="relative bg-gray-50 z-50 py-16 bg-opacity-90 page">
          <div className="max-w-screen-xl mx-auto px-4 space-y-8 lg:space-y-0 sm:px-6 lg:px-8 lg:grid lg:grid-cols-6 lg:gap-8 lg:items-start">
            <div className="relative z-50 col-span-4">
              <div className="bg-gray-700 rounded-lg text-white py-16 px-8 mb-8">
                <h2 className="font-extrabold tracking-tight mb-8">
                  Address & Phone
                </h2>
                <p className="font-bold mb-0">Location</p>
                <a
                  href="#"
                  target={"_blank"}
                  rel="noreferrer"
                  className="mb-8"
                >
                  Address Street, Town, State, Zippy Do Da
                </a>
                <p className="font-bold mt-8 mb-0">Phone Number</p>
                <a
                  href="tel:+1-#"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  555-555-5555
                </a>
              </div>
              <h2 className="font-extrabold tracking-tight">Fill Out Form</h2>
              <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                We’d love to hear from you! Send us a message using the form and
                we'll get right back to you.
              </p>
              <ContactUsForm />
            </div>
          </div>
        </div>
      </main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
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
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(
      where: { location: $footerLocation }
      first: 50
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, {
    Page,
    props: { title: "Contact" },
  });
}
