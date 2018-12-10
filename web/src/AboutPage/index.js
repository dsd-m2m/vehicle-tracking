import React from 'react';
import api from '../api';

class AboutPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
	}


	render() {
		return(
			<div class ="team-section" >
					<h1>Our Team</h1>
					<hr class="border"></hr>

			<div class="ps">
				<a href="#p1"><img src="pictures/p1.jpg" alt=""></img></a>
				<a href="#p2"><img src="pictures/p2.jpg" alt=""></img></a>
				<a href="#p3"><img src="pictures/p3.jpg" alt=""></img></a>
				<a href="#p4"><img src="pictures/p4.jpg" alt=""></img></a>
				<a href="#p5"><img src="pictures/p5.jpg" alt=""></img></a>
				<a href="#p6"><img src="pictures/p6.jpg" alt=""></img></a>
				<a href="#p7"><img src="pictures/p7.jpg" alt=""></img></a>
			</div>

			<div class="section" id="p1">
					<span class="name">Zvonimir </span>
					<hr class="border"></hr>
					<p>
						Zvonimir is web developing is croatia.
					</p>
			</div>

				<div class="section" id="p2">
						<span class="name">Frano </span>
						<hr class="border"></hr>
						<p>
							Frano is web developing is croatia.
						</p>
				</div>

				<div class="section" id="p3">
						<span class="name">Mehdi </span>
						<hr class="border"></hr>
						<p>
							Mehdi is web developing is Milano.
						</p>
				</div>

				<div class="section" id="p4">
						<span class="name">Amin </span>
						<hr class="border"></hr>
						<p>
							Amin is web developing is Milano.
						</p>
				</div>

				<div class="section" id="p5">
						<span class="name">Soheil </span>
						<hr class="border"></hr>
						<p>
							Soheil is web developing is Milano.
						</p>
				</div>

				<div class="section" id="p6">
						<span class="name">Juraj</span>
						<hr class="border"></hr>
						<p>
							Juraj is web developing is croatia.
						</p>
				</div>

				<div class="section" id="p7">
						<span class="name">Tomislav </span>
						<hr class="border"></hr>
						<p>
							Tomislav is web developing is croatia.
						</p>
				</div>

</div>

			);
	}
}

export default AboutPage;
