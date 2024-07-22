import Container from "@/components/ui/container";
import Link from "next/link";


const SupportPage = () => {
  return (
    <Container>      
      <h1>Transport and delivery</h1>
      <h2>All questions and answers about transport and delivery.</h2>
      <ul>
        <li>My delivery is late, what should I do?</li>
        <li><Link href={'#'}>Can I change my shipping method?</Link></li>
        <li><Link href={'#'}>Do you ship to Norway?</Link></li>
        <li> <Link href={'#'}>Do you ship to North America?</Link></li>
        <li><Link href={'#'}>Do you ship to Malta?</Link></li>
      </ul>
    </Container>
  );
}

export default SupportPage;