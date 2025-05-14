document.addEventListener("DOMContentLoaded", () => {

    // <!-- Navbar -->
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // <!-- Skills Section -->
    const skills = [
        { name: "React.js", level: "90%", color: "bg-primary", icon: "fab fa-react" },
        { name: "Node.js", level: "85%", color: "bg-success", icon: "fab fa-node-js" },
        { name: "MongoDB", level: "80%", color: "bg-warning", icon: "fas fa-database" },
        { name: "Express.js", level: "75%", color: "bg-danger", icon: "fas fa-server" }
    ];

    // Load Skills Dynamically
    const skillsContainer = document.getElementById("skills-container");
    skills.forEach(skill => {
        skillsContainer.innerHTML += `
            <div class="col-md-6">
                <div class="skill-box">
                    <i class="${skill.icon}"></i>
                    <span class="skill-name">${skill.name}</span>
                </div>
                <div class="progress">
                    <div class="progress-bar ${skill.color}" style="width: ${skill.level};">${skill.level}</div>
                </div>
            </div>
        `;
    });

    // <!-- Portfolio Section -->
    const projects = [
        { title: "YouTube Clone", description: "A React-based YouTube UI clone.", img: "./assets/images/project1.jpg" },
        { title: "E-commerce Site", description: "Full-stack e-commerce website.", img: "./assets/images/project2.jpg" },
        { title: "Chat App", description: "Real-time chat application using MERN stack.", img: "./assets/images/project3.jpg" }
    ];

    // Load Portfolio Projects Dynamically
    const portfolioContainer = document.getElementById("portfolio-container");
    projects.forEach(project => {
        portfolioContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <img src="${project.img}" alt="${project.title}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <a href="https://github.com/TheNew-WebDeveloper" class="card-button" target="_blank">View Project</a>
                    </div>
                </div>
            </div>
        `;
    });

    //Form Details
    document.getElementById("userForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents page reload
    
        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
    
        // Create an object to store in Local Storage
        const userData = {
            name: name,
            email: email,
            message: message
        };
    
        // Convert object to JSON and save it in Local Storage
        localStorage.setItem("userData", JSON.stringify(userData));
    
    });

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", () => {
        return window.location.assign("action.html");
    })
    
});
