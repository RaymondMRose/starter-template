import { gql } from "@apollo/client";
import { flatListToHierarchical } from "@faustwp/core";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function DesktopNav({ menuItems }) {
  const hierarchicalMenuItems = flatListToHierarchical(menuItems);

  // console.log(hierarchicalMenuItems);

  return (
    <ul
      typeof="nav"
      className="hidden lg:flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex lg:gap-x-12">
        {hierarchicalMenuItems.map((item) => {
          const { id, path, label, children } = item;

          // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
          if (!item.hasOwnProperty("__typename")) {
            return null;
          }

          return (
            <li
              key={id}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {children.length ? (
                <MenuDropdown parentLabel={label} children={children} />
              ) : (
                <Link
                  key={id}
                  href={path}
                  className="text-sm font-semibold leading-6 text-gray-90"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </div>
    </ul>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MenuDropdown = ({ parentLabel, children }) => {
  const [openState, setOpenState] = useState(false);
  // console.log({ parent })
  // console.log({ children })

  // Open the menu after a delay of timeoutDuration
  const onHover = (action) => {
    // if the modal is currently closed, we need to open it
    // OR
    // if the modal is currently open, we need to close it
    if (
      (!openState && action === "onMouseEnter") ||
      (openState && action === "onMouseLeave")
    ) {
      setOpenState((openState) => !openState);
    }
  };

  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
      onMouseEnter={() => onHover("onMouseEnter")}
      onMouseLeave={() => onHover("onMouseLeave")}
    >
      <div>
        <Menu.Button className="flex-row inline-flex bg-transparent">
          <span className="flex-row text-sm font-semibold leading-6 text-inherit">
            {parentLabel}
          </span>
          <ChevronDownIcon className="h-5 w-5 mt-1 ml-1" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        show={openState}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-bottom-center top-7 absolute w-48 shadow-lg rounded-sm bg-gray-200 opacity-95 focus:outline-none z-50 border-2 border-gray-500">
          {children.map((item) => (
            <Menu.Item key={"header-" + item.id}>
              {({ active }) => (
                <a
                  href={item.path}
                  className={classNames(
                    active ? "bg-gray-300" : "",
                    "z-50 block py-2 px-2 text-base font-medium text-inherit"
                  )}
                >
                  {item.label}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

DesktopNav.fragments = {
  entry: gql`
    fragment DesktopNavMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
