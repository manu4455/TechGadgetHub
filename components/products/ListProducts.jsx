"use client";

import React from "react";
import CustomPagination from "../layouts/CustomPagination";
import Filters from "../layouts/Filters";
import ProductItem from "./ProductItem";

const ListProducts = ({ data }) => {
    return (
        <section className="py-12 ">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <aside className="md:col-span-1">
                        <Filters />
                    </aside>
                    <main className="md:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data?.products?.map(product => (
                                <ProductItem key={product?._id} product={product} />
                            ))}
                        </div>
                        {data?.products?.length > 0 && (
                            <div className="mt-6 flex justify-center">
                                <CustomPagination
                                    resPerPage={data?.resPerPage}
                                    productsCount={data?.filteredProductsCount}
                                />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
};

export default ListProducts;

