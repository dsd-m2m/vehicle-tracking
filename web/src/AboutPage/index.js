import React from 'react';
import Header from '../_components/Header';

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
			<div className="AboutPage">
				<Header/>
				<div className="team-section" >
						

					<div className="memberPics">
						<a href="#p1"><img src="pictures/p1.jpg" alt=""></img></a>
						<a href="#p2"><img src="pictures/p2.jpg" alt=""></img></a>
						<a href="#p3"><img src="pictures/p3.jpg" alt=""></img></a>
						<a href="#p4"><img src="pictures/p4.jpg" alt=""></img></a>
						<a href="#p5"><img src="pictures/p5.jpg" alt=""></img></a>
						<a href="#p6"><img src="pictures/p6.jpg" alt=""></img></a>
						<a href="#p7"><img src="pictures/p7.jpg" alt=""></img></a>
					</div>

						<div className="section" classID="p6">
								<span className="name">Juraj</span>
								<hr className="border"></hr>
								<p>
									Juraj is product owner and when he isnt he is just a casual 23-year-old guy from Sisak,Croatia.
									Currently he is studying Software Engineering at Fer, University of Zagreb.
									His main interests are C, C++, Java, Javascript, C#, Arduino C, Project Managment, Public speaking.
									in his free time he loves dancing, boxing and listening to audiobooks. He is member of BEST (Board of European Students of Technology) so 
									he travels a lot all over Europe.If you need to contact him his E-mail is:juraj.pejnovic@fer.hr or juraj.pejnovic@gmail.com.
								</p>
						</div>

						<div className="section" classID="p7">
								<span className="name">Tomislav </span>
								<hr className="border"></hr>
								<p>
									 Tomislav is ex-product owner.He is 24 years old  student born in Zagreb,Croatia.
									 He got his Bachelor's degree for embedded systems and he is currently pursuing  his 
									 Master's in computer engineering at FER, Zagreb.His main interests are Embedded software, Cloud Computing (DevOps) and
									 Web development.In his free time he loves to play tennis, play the guitar and he is really into board games.
									 If you need to contact him his E-mail is: tomislav.skokovic@fer.hr
								</p>
						</div>

						<div className="section" classID="p1">
								<span className="name">Zvonimir </span>
								<hr className="border"></hr>
								<p>
									Zvonimir is 24 years old student from Karlovac,Croatia.He currently enrolls his master's 
									degree in programme 'Information and Communication Technology' at FER university in Zagreb. 
									Already he finished his bachelor's degree in Sofware Engineering on the same university.
									His main interest are web and mobile development,IoT and machine learning applications.In his 
									free time he plays guitar,read literature,goes to concerts and cycling.
									If you need to contact him his E-mail is "zvonimir.loncaric@fer.hr"
								</p>
						</div>

						<div className="section" classID="p2">
								<span className="name">Frano </span>
								<hr className="border"></hr>
								<p>
									Frano is 23 years old student born and raised in Zagreb,Croatia.He is on his way of finishing his master's 
									degree in Computer Engineering at FER university in Zagreb.He has bachelor's degree in Computer Engineering on the same
									university.His main interests are Java programming,C and embedded programming.In his free time Frano is playing different sports
									mainly basketball and football and when he is feeling lazy he plays video games at home.
									If you need to contact him his E-mail is frano.mirkovic@fer.hr
								</p>
						</div>

						<div className="section" classID="p3">
								<span className="name">Mehdi </span>
								<hr className="border"></hr>
								<p>
									Mehdi is 24 years old Iranian boy currently studying Computer Science and Engineering at POLIMI.He recently graduated with a bachelor's degree 
									in Computer Software Engineering.He has huge interest in robotics and autonomous vehicles and he worked for more than 3 years 
									as a research assistant in a robotics laboratory.His main interests are robotics, autonomous vehicles, embedded systems, 
									automation and control.In his free time he loves to travel,swim,hike,listening to music or reading literature.If you need to contact him his 
									E-mail is:mehdi.mehdikhani@mail.polimi.it
								</p>
						</div>

						<div className="section" classID="p4">
								<span className="name">Amin </span>
								<hr className="border"></hr>
								<p>
									Amin is 24 years old student from Iran.He is currently pursuing his Master's degree in Computer Science at POLIMI.
									He got his Bachelor's degree in software engineering in 2017.His main interests are backend development and databases.
									In his free time he loves running,hiking and swimming.If you need to contact him his E-mail is:aminmahboobi@gmail.com
								</p>
						</div>

						<div className="section" classID="p5">
								<span className="name">Soheil </span>
								<hr className="border"></hr>
								<p>
									Soheil is  31 years old student from Iran.Currently he is studying computer science and engineering at POLIMI,Milano.
									He's got his bachelor's degree in Computer Software Engineering.His main interests are:Asp.net programming, C# programming.
									In his free time he loves to go swimming or playing football.If you need to contact him his E-mail is:soheilghanbari1365@gmail.com
								</p>
						</div>
				</div>

		</div>

			);
	}
}

export default AboutPage;
