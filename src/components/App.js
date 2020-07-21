import Navbar from "./Navbar.js";
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import CharityHandler from '../abis/CharityHandler.json';
import Charity from '../abis/Charity.json';
import Web3 from 'web3';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Main from './Main';
import Sidebar from './Sidebar';
import FeaturedPost from './FeaturedPost';
// import classes from 'classes';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MainFeaturedPost from './MainFeaturedPost';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      charityHandler: {},
      etherBalance: '',
      sections: [
        { title: 'Technology', url: '#' },
        { title: 'Design', url: '#' },
        { title: 'Culture', url: '#' },
        { title: 'Business', url: '#' },
        { title: 'Politics', url: '#' },
        { title: 'Opinion', url: '#' },
        { title: 'Science', url: '#' },
        { title: 'Health', url: '#' },
        { title: 'Style', url: '#' },
        { title: 'Travel', url: '#' },
      ],
      featuredPosts : [
        {
          title: 'Featured post',
          date: 'Nov 12',
          description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
          image: 'https://source.unsplash.com/random',
          imageText: 'Image Text',
        },
        {
          title: 'Post title',
          date: 'Nov 11',
          description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
          image: 'https://source.unsplash.com/random',
          imageText: 'Image Text',
        },
      ],
      posts: [post1, post2, post3],
      sidebar : {
        title: 'About',
        description:
          'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
        archives: [
          { title: 'March 2020', url: '#' },
          { title: 'February 2020', url: '#' },
          { title: 'January 2020', url: '#' },
          { title: 'November 1999', url: '#' },
          { title: 'October 1999', url: '#' },
          { title: 'September 1999', url: '#' },
          { title: 'August 1999', url: '#' },
          { title: 'July 1999', url: '#' },
          { title: 'June 1999', url: '#' },
          { title: 'May 1999', url: '#' },
          { title: 'April 1999', url: '#' },
        ],
        social: [
          { name: 'GitHub', icon: GitHubIcon },
          { name: 'Twitter', icon: TwitterIcon },
          { name: 'Facebook', icon: FacebookIcon },
        ],
      },
      mainFeaturedPost : {
        title: 'Title of a longer featured blog post',
        description:
          "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: 'https://source.unsplash.com/random',
        imgText: 'main image description',
        linkText: 'Continue reading…',
      }

    }
      
  }
  componentWillMount = async () => {
    await this.loadWeb3()
    await this.loadBlockchainData()
    // console.log(this.state.account)
  }
  loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    const balance = await web3.eth.getBalance(accounts[0])
    this.setState({ account: accounts[0], balance })
    const networkId = await web3.eth.net.getId()
    const charityHandlerData = CharityHandler.networks[networkId]
    if (charityHandlerData) {
      const charityHandler = new web3.eth.Contract(CharityHandler.abi, charityHandlerData.address)
      this.setState({ charityHandler })
      const allCharityAddress = await charityHandler.methods.getAllCharityAddress().call({from:this.state.account});
      const myCharity = await charityHandler.methods.getOwnedCharities().call({ from: '0xBcFDa0C0946143D37f09B87F490B0AE0F998A88B' });
      this.setState({ allCharityAddress });
      this.setState({ myCharity });
    }
    else {
      window.alert('Charity Handler not deployed to current network')
    }
  }
  getCharityData = (address) => {
    
  }
  loadWeb3 = async() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Consider trying Metamask')
      window.location.href('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')
    }
  }
  render() {

    return (
      // <div>
      //   <Provider store = { store }>
      //     <Router>
      //       <Navbar />
            
      //       </Router>
      //     </Provider>
      // </div>
      <div>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="DCharity" sections={this.state.sections} />
          <main>
          <MainFeaturedPost post={this.state.mainFeaturedPost} />
          <Grid container spacing={4}>
            {this.state.featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          {/* <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="From the firehose" posts={this.state.posts} />
            <Sidebar
              title={this.state.sidebar.title}
              description={this.state.sidebar.description}
              archives={this.state.sidebar.archives}
              social={this.state.sidebar.social}
            />
          </Grid> */}

          </main>

        </Container>
      </div>
      
    );
  }
}

export default App;
