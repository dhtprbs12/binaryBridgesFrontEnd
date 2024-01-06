import React from 'react'
import './css/body.css'
import Subscription from './subscription/subscription'

function Body() {
	React.useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<div className='body-container'>
			<div className='body-header'>
				<h1>The Algorithm Secrets Black Tutorials</h1>
				<h2>
					"53 Most Popular Algorithm SECRETS That Will Change Your Career...And
					Change Your Life!"
				</h2>
			</div>
			<Subscription />
			<div className='body-content'>
				<div style={{ display: 'inline-block' }}>
					Want To Know How I Made My Salary From <u>ZERO to $200,000</u> As a
					Software Engineer...? Then, Get Your <b>FREE Digital Tutorals</b> Now!
				</div>
				<div className='body-box-wrapper'>
					<div className='body-box-container'>
						<div className='body-box-title'>
							<h1 className='main-title'>
								The Algorithm Secrets Black Tutorials
							</h1>
							<h1 className='sub-title'>
								Inside of This Tutorial You'll Discover...
							</h1>
						</div>
						<div className='body-box-content'>
							Dear Friends,
							<div>
								<br />
							</div>
							<div>
								Embark on a transformative journey with{' '}
								<b>Algorithm Secrets Black tutorials</b>!🚀
							</div>
							<div>
								<br />
							</div>
							<div>
								For the past 4 years, I've been deep in the algorithm trenches,
								figuring out the keys to crack problems and make sense of those
								tricky coding techniques...
							</div>
							<div>
								<br />
							</div>
							<div>Let's be honest – YouTube can be a bit of a maze.</div>
							<div>
								<br />
							</div>
							<div>
								You click on videos, hoping for answers, but most just lead to
								other rabbit holes.
							</div>
							<div>
								<br />
							</div>
							<div>
								Your time is precious, and I've been there and done that. I
								value my time, just as you do.
							</div>
							<div>
								<br />
							</div>
							<div>
								Now picture this: Uncover the essentials, the HOWs and the WHYs.
							</div>
							<div>
								<br />
							</div>
							<div>
								No more fleeting understanding, no more endless YouTube rabbit
								holes.
							</div>
							<div>
								<br />
							</div>
							<div>
								You deserve more - an education that empowers you to solve
								problems independently.
							</div>
							<div>
								<br />
							</div>
							<div>Are you tired of the noise, the wasted time? I get it.</div>
							<div>
								<br />
							</div>
							<div>
								That's why <b>Algorithm Secrets Black tutorials</b> exists.
							</div>
							<div>
								<br />
							</div>
							<div>
								It's not just a course; it's a pact to guide you through the
								essentials, ensuring you not only crack problems but truly
								comprehend them.
							</div>
							<div>
								<br />
							</div>
							<div>Join me.</div>
							<div>
								<br />
							</div>
							<div>
								Let's rewrite your algorithm journey with purpose,
								understanding, and a relentless commitment to your success.
							</div>
							<div>
								<br />
							</div>
							<div>Are you on the same page?</div>
							<div>
								<br />
							</div>
							<div>Let's decode the secrets together.</div>
							<div>
								<br />
							</div>
						</div>
						<div className='outcome-title'>
							<h1>Get The Outcome You're Desired For</h1>
						</div>
						<div className='body-box-sub-content'>
							Black tutorials delivers a robust compilation of Algorithm Secrets
							for the most popular 53 problems, cutting through the fluff with a
							no-nonsense approach. Get straight to the point and supercharge
							your understanding!
							<div>
								<br />
							</div>
							<div>
								Ability to find hints for solving algorithm problems has helped
								me take my salary from ZERO to over $200,000 in sales in just 4
								years.
							</div>
							<div>
								<br />
							</div>
							<div>
								And what's truly phenomenal is that these 'secrets' pack a punch
								– they're concise, compelling, and dive straight into the core
								of the matter, delivering: when it comes to:
							</div>
							<div>
								<br />
							</div>
							<div className='check-marks'>
								<div className='check-mark-left'>
									<ul>
										<li>
											<i></i>
											<div>
												<b>Unleashing your coding superpowers</b>
											</div>
											<br />
										</li>
										<li>
											<i></i>
											<div>
												<b>Mastering algorithms without the fluff</b>
											</div>
											<br />
										</li>
										<li>
											<i></i>
											<div>
												<b>Turbocharging your coding journey</b>
											</div>

											<br />
										</li>
										<li>
											<i></i>
											<div>
												<b>Cutting through the complexity with simplicity</b>
											</div>
											<br />
										</li>
									</ul>
								</div>
								<div className='check-mark-right'>
									<ul>
										<li>
											<i></i>
											<div>
												<b>Streamlining problem-solving like a pro</b>
											</div>
											<br />
										</li>
										<li>
											<i></i>
											<div>
												<b>Navigating the coding universe with ease</b>
											</div>
											<br />
										</li>
										<li>
											<i></i>
											<div>
												<b>Making coding challenges a breeze</b>
											</div>
											<br />
										</li>
										<li>
											<i></i>
											<div>
												<b>Maximizing your coding potential</b>
											</div>
											<br />
										</li>
									</ul>
								</div>
							</div>
							<div>
								<br />
							</div>
							<div>It’s all laid out for you.</div>
							<div>
								<br />
							</div>
							<div>
								All you have to do is hack every single tip, trick, secret, and
								time-tested strategy to make them your own.
							</div>
							<div>
								<br />
							</div>
							<div>These Black Algorithms Secrets are ready to help you!</div>
							<div>
								<br />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Body
