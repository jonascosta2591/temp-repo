import './styles.css';
import { Component } from 'react';
import { PostCard } from '../../components/PostCard';
import {loadPosts} from '../../Utils/load-posts'
import { Posts } from '../../components/Posts';
import {Button} from '../../components/Button'
import { TextInput } from '../../components/TextInput';

class Home extends Component{
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  }

  timoutUpdate = null

  componentDidMount(){
    this.loadPostds()
  }

  loadPostds = async () => {  //juntar 2 json
    const {page, postsPerPage} = this.state

    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({searchValue: value})
  }

  render(){
    const {posts, page, postsPerPage, allPosts, searchValue} = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length 
    
    const filteredPosts = !!searchValue ? allPosts.filter(post=>{
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase())
    }) : posts


    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && //AVALIAÇÃO DE CURTO CIRCUITO
            <h1>Search value: {searchValue}</h1>
          }
          <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}></Posts>
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts</p>
        )}

        {!searchValue && (
          <Button 
          text="load more posts"
          onClick={this.loadMorePosts}
          disabled={noMorePosts}
          />
        )}
      </section>
      
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Home;
