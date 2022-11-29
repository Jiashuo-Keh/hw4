import React, { Fragment , useEffect,useState  } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { checkposts,updatePost } from '../../actions/posts';
import Col from 'react-bootstrap/Col';
import '../../css/post.css' 
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';





const initialState={
  title:'',
  text:'', 
  id:''
}

const Posts = ({ posts, checkposts,name,updatePost }) => {
  const [postForm, setpostForm] = useState(initialState);
  const [comment, setcomment] = useState([]);
  const[fileInputState,setFileInputState]=useState('')
  const[previewSource,setPreviewSource]=useState('http://knttraining.co.uk/wp-content/uploads/2018/11/how-to-add-a-png-to-a-photo-380x380.png')
  const [showedData, showData] = useState(posts.slice(0, 3));
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {

    console.log("showData")
    console.log("currentPage:"+currentPage)
    showData( posts.slice((currentPage-1)*3, currentPage*3))



    

  
  },[posts]);
  const{
    title,
    text,
    id
  }=postForm


      const [show, setShow] = useState(false);
      const  [postId,setpostId]=useState(1)
      const handleClose = () => setShow(false);
      const handleShow = () => {
        setShow(true);
      }
      const modalWithItem=(id,title,text,img)=>{
        console.log("传参："+name)
        var tmp={id:id,title:title,text:text}
        setpostForm(tmp)
        setPreviewSource(img)

        handleShow()
      }
      const modifyPost=async()=>{
        console.log("modify"+title.length+" "+text.length)
        if(title.length!=0&&text.length!=0){


          if(previewSource!='http://knttraining.co.uk/wp-content/uploads/2018/11/how-to-add-a-png-to-a-photo-380x380.png'){
            updatePost(id,title,text,previewSource)
          }else{
            updatePost(id,title,text,'')
          }

          handleClose()
        }else{
          window.alert("Title and text can not be empty!")
        }
        
      }
      const[showCom,setShowCom]=useState(false);
      const handleCloseCom = () => setShowCom(false);


      const handleShowCom = async(key,id) => {
        

        // sssssssssssssssssss
        console.log(":"+key)
        console.log("id:"+id)
        var post=await fetch('http://localhost:8080/articles/comment/'+key, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }).then(res => {
            return res.json();
        })

        setcomment(post.comment)
        setpostId(key)
        
        setShowCom(true)
      };


      const sumbitNewCom=async()=>{
        var text=document.getElementById("newComment").value
        console.log(postId)
        var post=await fetch('http://localhost:8080/articles/'+postId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({text:text,commentId:'-1',title:''})
        }).then(res => {
            return res.json();
        })

        setcomment(post.comments)



      }





// each post contains author, timestamp, text, and at least three have images
// a button to unfollow
const changepage=(page)=>{

  setCurrentPage(page);
  const PageIndex=page-1;
  const firstIndex=PageIndex*3;
  const lastIndex=PageIndex*3+3;
  showData(posts.slice(firstIndex, lastIndex));


}

const hangleFileInputChange=(e)=>{
  const file=e.target.files[0]
  previewFile(file)
}

const previewFile=(file)=>{
  const reader=new FileReader()
  reader.readAsDataURL(file)
  reader.onload=()=>{
    setPreviewSource(reader.result)
  }
}

const onChange = (e) =>
setpostForm({ ...postForm, [e.target.name]: e.target.value });

    const post = showedData.map((po) => (
        <Col xs={6} md={4}>
        <Card  className='cardpost' style={{overflowY: 'auto',height:400}}>
        {(po.img!='')&&<Card.Img className='postimg' variant="top" src={po.img} />}
        <Card.Title>{po.title}</Card.Title>
        <span>Auther: {po.id}</span>
        <span>Date:{po.date}</span>
        <Card.Body>
          <Card.Text>
            {po.content}
            <br/>
            {(name==po.id)&&(<Button variant="outline-secondary" onClick={()=>modalWithItem(po.key,po.title,po.content,po.img)}>Edit</Button>)}
            
            <Button className='btn2' variant="outline-secondary" onClick={()=>handleShowCom(po.key,po.id)} >Comment</Button>
          </Card.Text>
        </Card.Body>

      </Card>

        </Col>
      ));





      let items = [];
      if(posts.length%3==0){
        for (let number = 1; number <= posts.length/3; number++) {
          items.push(
            <Pagination.Item onClick={()=>changepage(number)} key={number} active={number === currentPage}>
              {number}
            </Pagination.Item>,
          );
        }
      }else{
        for (let number = 1; number <= posts.length/3+1; number++) {
          items.push(
            <Pagination.Item onClick={()=>changepage(number)} key={number} active={number === currentPage}>
              {number}
            </Pagination.Item>,
          );
        }
      }

      const commentItem = comment.map((com) => (
        <tr key={com.commentId}>

                <td colSpan={2}>{com.text}</td>
                <td>{com.user}</td>
                <td>{com.date}</td>

        </tr>
      ));
      

    return (
        <Fragment>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {previewSource&&(
              <img src={previewSource} alt="chosen" style={{height:'200px'}}/>
            )}
            <input type="file" name="image" onChange={hangleFileInputChange}
              value={fileInputState}/>
          <button type='submit'>Choose</button>
          <button type='submit'>Clear</button>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder='Modify title'
              name="title"
              value={title}
              onChange={onChange}
  />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3}
                              placeholder='Modify text'
                              name="text"
                              value={text}
                              onChange={onChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={modifyPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showCom} onHide={handleCloseCom}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* comment */}
        <div style={{overflowY: 'auto',height:350}}>
          <Table striped>
            <tbody>
            {commentItem}
            </tbody>
          </Table>
        </div>
          <Form.Control id="newComment" as="textarea" rows={3} placeholder='New Comments'/>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCom}>
            Close
          </Button>
          <Button variant="primary" onClick={sumbitNewCom}>
            Submit Comments
          </Button>
        </Modal.Footer>
      </Modal>




            {post}
      <Pagination>{items}</Pagination>


        </Fragment>

      );






}

Posts.propTypes = {
    checkposts: PropTypes.func.isRequired,
    name:PropTypes.string,
    updatePost:PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    name:state.name,
  });

  
export default connect(mapStateToProps,{ checkposts ,updatePost})(Posts);