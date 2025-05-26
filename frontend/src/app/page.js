import Hero from "@/components/Hero";
import BookList from "@/components/HomePageBookList";


export default async function Home() {
  return (
    <>
      <Hero />
      <main>      
        <BookList />
      </main>
    </>
  );
}
