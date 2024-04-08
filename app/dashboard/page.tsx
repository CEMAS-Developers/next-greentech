import LatestInvoices from '../ui/dashboard/latest-invoices';
import CardWrapper from '@/app/ui/dashboard/cards';
import { CardsSkeleton } from '@/app/ui/skeletons';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  return (
    <main className='overflow-hidden'>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <Suspense fallback={<CardsSkeleton />}>
        <div className='max-w-screen w-screen'>
          <CardWrapper />
        </div>
      </Suspense>
      <div className="mt-6">
        {/* <LatestInvoices /> */}
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Zafacones</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Buscar Zafacón..." />
          </div>
          <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
            <Table query={query} currentPage={currentPage} />
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </main>
  );
}