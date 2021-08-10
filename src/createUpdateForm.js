function createUpdateForm(props){
    return(
        <div className="w-100 book_create p-lg-4 p-md-2 p-sm-2 text-center">
            <div class="form">
            <div >
                Add a book into the library.
            </div>
            <form >
                <br/><br/>
                Book Name :
                <input id="bookname" type="text" required/>
                <br/><br/><br/>
                Author :
                <input id="author" type="text" required/>
                    <br/><br/><br/>
                Published Date :
                 <input id="author" type="date" required/>
                        <br/>
                <br/><br/>
                Genre :
                <select id="genre" required>
                    <option id="Anime">Anime</option>
                    <option id="Comedy">Comedy</option>
                    <option id="Thriller">Thriller</option>
                    <option id="Romance">Romance</option>
                    <option id="Mystery">Mystery</option>
                    <option id="Horror">Horror</option>
                    <option id="Drama">Drama</option>
                    <option id="Sci-fi">Sci-fi</option>
                    <option id="Historic">Historic</option>
                    <option id="Other">Other</option>
                </select>
                <br/><br/><br/><br/>
                <button type="submit" >Submit! </button>

            </form>
                </div>
        </div>
    )

}
export default createUpdateForm