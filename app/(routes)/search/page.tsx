import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import { fetchProducts } from "@/actions/fetch-products";
import { v4 as uuidv4 } from 'uuid';

export const revalidate = 0;

const SearchPage = async ({
  searchParams
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) => {
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined
 
  const productsData = await fetchProducts({search});  

  const [products] = await Promise.all([productsData]);

  return ( 
    <div className='py-2 bg-beige-100 italic dark:bg-slate-800'>
      <Container>
        <ul 
          key={uuidv4()}
          className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8"
        >
          <ProductList category_filter_id="" tag_id="" category_id="" search={search} title="All Products" initialItems={products}/>
        </ul>
      </Container>
    </div>
  )
 
}

export default SearchPage;