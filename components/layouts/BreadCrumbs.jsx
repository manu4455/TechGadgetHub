import React from "react";
import Link from "next/link";

const BreadCrumbs = ({ breadCrumbs }) => {
  return (
    <nav aria-label="breadcrumb" className="py-4 bg-gradient-to-r from-green-300 to-green-500 text-black shadow-lg">
  <div className="container max-w-screen-xl mx-auto px-4">
    <ol className="flex items-center gap-1 text-sm">
      {breadCrumbs?.map((breadCrumb, index) => (
        <React.Fragment key={index}>
          <li>
            <Link href={breadCrumb.url}>
              <span className="block transition hover:text-gray-500 cursor-pointer">
                {index === 0 ? (
                  <span className="sr-only">{breadCrumb.name}</span>
                ) : (
                  breadCrumb.name
                )}

                {index === 0 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                )}
              </span>
            </Link>
          </li>

          {breadCrumbs.length - 1 !== index && (
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black mx-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
          )}
        </React.Fragment>
      ))}
    </ol>
  </div>
</nav>


  );
};

export default BreadCrumbs;
