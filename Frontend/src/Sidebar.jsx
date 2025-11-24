import "./Sidebar.css";

function Sidebar() {
    return(
        <section className="sidebar">
            {/* new chat button */}
            <button>
                    <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"/>
                    <i className="fa-solid fa-pen-to-square"></i>
            </button>

            {/* history */}
            <ul className="history">
                <li>history1</li>
                <li>history2</li>
                <li>history3</li>
            </ul>

            {/* sign */} 
            <div className="sign">
                <p>By Apna College &hearts;</p>
            </div>

        </section>
    )
}

export default Sidebar;