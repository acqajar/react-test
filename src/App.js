import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

import './App.css';
/* eslint-disable */
import logo from './logo.svg';

/////////////////
/// COMPONENTS //
/////////////////
// Container
/////////////////
/// COMPONENTS //
/////////////////

// Container
var App = createReactClass({
	apiKey: '87dfa1c669eea853da609d4968d294be',
	getInitialState: function() {
		return {data: []};
	},
	performSearch: function(e) {
		// stop form from submitting
		e.preventDefault();


	},
	componentDidUpdate: function() {

	},
	render: function() {

		if(this.state.data.results) {
			console.log(this.state.data);
		}

		return (
			<div>
				<Header onSubmit={this.performSearch} />
				<Hero />
				<TitleList title="Top Job picks for Arsames" className ="TitleClass"/>
				<TitleList title="Trending now" className ="TitleClass"/>
				<TitleList title="Most applied to in Tech" className ="TitleClass" />
				<TitleList title="Startup greats" className ="TitleClass" />
				<TitleList title="Reel magic" className ="TitleClass" />
			</div>
		);
	}
});

////////////
// Header //
////////////

var Header = createReactClass({
	render: function() {
		return (
			<header className="Header">
				<Logo />
				<Navigation />
				<Search onSubmit={this.props.onSubmit} />
				<UserProfile />
			</header>
		);
	}
});

// Logo
var Logo = createReactClass({
	render: function() {
		return (
			<div id="logo" className="Logo" >
        JobReel

			</div>
		);
	}
});

// Navigation
var Navigation = createReactClass({
	render: function() {
		return (
			<div id="navigation" className="Navigation">
				<nav>
					<ul>
						<li>Browse</li>
						<li>My list</li>
						<li>Top picks</li>
						<li>Recent</li>
					</ul>
				</nav>
			</div>
		);
	}
});

// Search
var Search = createReactClass({
	render: function() {
		return (
			<form onSubmit={this.props.onSubmit} id="search" className="Search">
				<input type="search" placeholder="Search for a title..." />
			</form>
		);
	}
});

// User Profile
var UserProfile = createReactClass({
	render: function() {
		return (
			<div className="UserProfile">
				<div className="User">
					<div className="name">Arsames Qajar</div>
					<div className="image"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/profile/profile-512_1.jpg" /></div>
				</div>
				<div className="UserProfile-menu">
					<div className="UserProfileSwitch">
						<ul>
							<li>
								<div className="UserProfile-image">
									<img src="http://lorempixel.com/96/96" />
								</div>
								<div className="UserProfile-name">
									Alexander
								</div>
							</li>
							<li>
								<div className="UserProfile-image">
									<img src="http://lorempixel.com/96/96" />
								</div>
								<div className="UserProfile-name">
									Mattias
								</div>
							</li>
						</ul>
					</div>
					<div className="UserNavigation">
						<ul>
							<li>Your Account</li>
							<li>Help Center</li>
							<li>Sign out of Jobreel</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
});

//////////
// Hero //
//////////

var Hero = createReactClass({
	render: function() {
		return (
			<div id="hero" className="Hero" style={{backgroundImage: 'url(https://i.gadgets360cdn.com/large/zuckerberg_ai_flickr_Maurizio_Pesce_1501585525329.jpg?output-quality=80)'}}>
				<div className="content">
					<img className="logo" src="https://duo.com/assets/img/customerlogos/tech-facebook.png" alt="" />
					<h2 style={{color:'white'}}>Front End Job Reel Watch Now</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.</p>
					<div className="button-wrapper">
						<HeroButton primary={true} text="Watch Now" />
						<HeroButton primary={false} text="+ My list" />
					</div>
				</div>
				<div className="overlay"></div>
			</div>
		);
	}
})

// Hero Button
var HeroButton = createReactClass({
	render: function() {
		return (
			<a href="#" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
		);
	}
})

////////////////
// Title List //
////////////////

// Title List Container

var TitleList = createReactClass({
	apiKey: '87dfa1c669eea853da609d4968d294be',
	getInitialState: function() {
		return {data: [], mounted: false};
	},
	loadContent: function() {
		var requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.apiKey;

		// $.ajax({
    //   url: requestUrl,
    //   dataType: 'json',
    //   cache: false,
    //   success: function(data) {
    //     this.setState({data: data});
		// 		// console.log(data);
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
	},
	componentDidMount: function() {
		this.loadContent();
		this.setState({ mounted: true });
	},
	componentWillUnmount: function() {
		this.setState({ mounted: false });
	},
	render: function() {
		if(this.state.data.results) {
			var titles = this.state.data.results.map(function(title, i) {
				if(i < 5) {

					var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
					if(!title.name) {
						var name = title.original_title;
					} else {
						var name = title.name;
					}

					return (
						<Item key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
					);

				}
			});

		} else {
			var titles = '';
		}

		return (
			<div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
				<div className="Title">
					<h1 className ="TitleClass">{this.props.title}</h1>
					<div className="titles-wrapper">
						{titles}
					</div>
				</div>
			</div>
		);
	}
});

// Title List Item
var Item = createReactClass({
	render: function() {
		return (
			<div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}} >
				<div className="overlay">
					<div className="title">{this.props.title}</div>
					<div className="rating">{this.props.score} / 10</div>
					<div className="plot">{this.props.overview}</div>
					<ListToggle />
				</div>
			</div>
		);
	}
});

// ListToggle
var ListToggle = createReactClass({
	getInitialState: function() {
		return({ toggled: false })
	},
	handleClick: function() {
		if(this.state.toggled === true) {
			this.setState({ toggled: false });
		} else {
			this.setState({ toggled: true });
		}

	},
	render: function() {
		return (
			<div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
				<div>
					<i className="fa fa-fw fa-plus"></i>
					<i className="fa fa-fw fa-check"></i>
				</div>
			</div>
		);
	}
});



ReactDOM.render(
	<App />,
	document.getElementById('app')
);
