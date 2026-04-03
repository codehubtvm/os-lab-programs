async function runCode() {
    try {
        const code = editor.getValue();

        const res = await fetch("https://os-lab-programs.onrender.com/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
        });

        const data = await res.json();
        document.getElementById("terminal").innerText = data.output;

    } catch (error) {
        document.getElementById("terminal").innerText =
            "❌ Error: " + error.message;
        console.error(error);
    }
}