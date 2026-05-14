import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Timeline from "./components/Timeline.jsx";
import Contact from "./components/Contact.jsx";

export default function RajCosmos() {
	return (
		<div className="cosmos-root">
			<Navbar />
			<main className="cosmos-main">
				<Hero />
				<About />
				<Timeline />
				<Contact />
			</main>
		</div>
	);
}
