'use client'
import React, { useState, useEffect, useRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, Highlight, Configure, connectSearchBox } from 'react-instantsearch-dom';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import Image from 'next/image';

const algoliaAppId = process.env.ALGOLIA_APP_ID;
const algoliaApiKey = process.env.ALGOLIA_API_KEY;
const searchClient = algoliasearch(algoliaAppId, algoliaApiKey);

function Hit({ hit }) {
  return (
    <Link href={`/product/${hit._id}`} passHref>
      <div className="flex items-start space-x-4 p-4  last:border-b-0 hover:bg-gray-100 cursor-pointer">
        {hit.images?.[0]?.url ? (
          <div className="relative w-8 h-8 rounded-md shadow-sm">
            <Image
              src={hit.images[0].url}
              alt={hit.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-md shadow-sm bg-gray-300" />
        )}
        <div className="flex-grow">
          <h3 className="text-sm font-semibold text-gray-900">
            <Highlight attribute="name" hit={hit} tagName="mark" />
          </h3>
        </div>
      </div>
    </Link>
  );
}

const CustomSearchBox = ({ refine, currentRefinement, setValue }) => {
  const inputRef = useRef(null);

  const debouncedRefine = debounce(value => {
    refine(value);
  }, 300);

  useEffect(() => {
    debouncedRefine(currentRefinement);
    return () => {
      debouncedRefine.cancel();
    };
  }, [currentRefinement, debouncedRefine]);

  const handleChange = event => {
    const value = event.target.value;
    setValue(value);
    refine(value);
  };

  return (
    <div className="flex items-center w-full   border border-gray-300 rounded-full  py-2 px-4 shadow-sm hover:shadow-md">
      <span className="pr-2 text-green-600">
        <i className="fas fa-search"></i>
      </span>
      <input
        ref={inputRef}
        type="text"
        value={currentRefinement}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full bg-transparent focus:outline-none  "
      />
    </div>
  );
};

const ConnectedSearchBox = connectSearchBox(CustomSearchBox);

const Search2 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSearchQuery('');
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative mt-5 md:mt-0 w-full md:w-2/4 lg:w-2/4" >
      <InstantSearch indexName={process.env.ALGOLIA_INDEX_NAME} searchClient={searchClient}>
        <div >
          <ConnectedSearchBox setValue={setSearchQuery} />
          <Configure hitsPerPage={5} />
          {searchQuery && (
            <div className="absolute mt-1 rounded-lg w-full z-10 max-h-60 overflow-y-auto shadow-lg bg-white border">
              <Hits hitComponent={Hit} />
            </div>
          )}
        </div>
      </InstantSearch>
    </div>
  );
}

export default Search2;
