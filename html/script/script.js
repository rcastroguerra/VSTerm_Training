        // Configuración de comandos disponibles
        const commands = {
            help: {
                description: "Muestra esta ayuda",
                action: () => {
                    return `
                        📚 <strong>Comandos disponibles:</strong><br>
                        • <span style="color:#4afc7c">iniciar</span> - Inicia la demostración interactiva<br>
                        • <span style="color:#4afc7c">comandos</span> - Lista de comandos que puedes usar<br>
                        • <span style="color:#4afc7c">click</span> - Instrucciones sobre dónde hacer clic<br>
                        • <span style="color:#4afc7c">teclear</span> - Instrucciones sobre qué teclear<br>
                        • <span style="color:#4afc7c">clear</span> - Limpia la pantalla<br>
                        • <span style="color:#4afc7c">demo</span> - Ejecuta una demostración automática
                    `;
                }
            },
            iniciar: {
                description: "Inicia la demostración",
                action: () => {
                    startDemo();
                    return "🚀 <strong>¡Demostración iniciada!</strong> Sigue las instrucciones en pantalla...";
                }
            },
            comandos: {
                description: "Lista de comandos",
                action: () => {
                    return `
                        📋 <strong>Comandos disponibles para escribir:</strong><br>
                        → <span style="color:#ffc107">iniciar</span> - Empieza la experiencia guiada<br>
                        → <span style="color:#ffc107">click</span> - Muestra dónde hacer clic<br>
                        → <span style="color:#ffc107">teclear</span> - Muestra qué teclear<br>
                        → <span style="color:#ffc107">ayuda</span> - Muestra esta lista
                    `;
                }
            },
            click: {
                description: "Instrucciones de clic",
                action: () => {
                    return `
                        🖱️ <strong>¿DÓNDE HACER CLIC?</strong><br>
                        ┌────────────────────────────────────────┐<br>
                        │ 1. En los comandos en <span style="color:#4afc7c">VERDE</span> (como "help")      │<br>
                        │ 2. En el área de entrada de texto      │<br>
                        │ 3. En los botones interactivos         │<br>
                        └────────────────────────────────────────┘<br>
                        <span style="color:#ffc107">✨ PRUEBA AHORA:</span> Haz clic en el comando "help" arriba
                    `;
                }
            },
            teclear: {
                description: "Instrucciones de tecleo",
                action: () => {
                    return `
                        ⌨️ <strong>¿QUÉ TECLEAR?</strong><br>
                        • Escribe <span style="color:#4afc7c">iniciar</span> y presiona ENTER para comenzar<br>
                        • Escribe <span style="color:#4afc7c">ayuda</span> para ver todos los comandos<br>
                        • Escribe cualquier comando de la lista<br>
                        • También puedes escribir tu nombre para personalizar<br>
                        <br>
                        <span style="color:#ffc107">✨ PRUEBA AHORA:</span> Escribe "iniciar" en el campo de abajo
                    `;
                }
            },
            clear: {
                description: "Limpia la pantalla",
                action: () => {
                    document.getElementById('history').innerHTML = '';
                    return "🧹 Pantalla limpiada";
                }
            },
            demo: {
                description: "Ejecuta demostración",
                action: () => {
                    simulateTyping("iniciar");
                    return "🎬 <strong>Ejecutando demostración automática...</strong>";
                }
            }
        };

        // Función para agregar mensajes al historial
        function addToHistory(command, output, isError = false) {
            const historyDiv = document.getElementById('history');
            const commandLine = document.createElement('div');
            commandLine.className = 'command-line';
            commandLine.style.animation = 'fadeIn 0.3s ease';
            
            const timestamp = new Date().toLocaleTimeString();
            
            commandLine.innerHTML = `
                <div class="prompt">➜ ~ $ <span style="color:#4afc7c">${escapeHtml(command)}</span> <span style="color:#6c6c8a; font-size: 11px;">[${timestamp}]</span></div>
                <div class="output" style="border-left-color: ${isError ? '#ff5f56' : '#4afc7c'}">
                    ${isError ? '❌ ' : '✓ '}${output}
                </div>
            `;
            
            historyDiv.appendChild(commandLine);
            
            // Auto-scroll al último mensaje
            commandLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Función para procesar comandos
        function processCommand(input) {
            const cmd = input.trim().toLowerCase();
            
            if (cmd === '') {
                addToHistory('', 'Por favor, escribe un comando', true);
                return;
            }
            
            if (commands[cmd]) {
                const output = commands[cmd].action();
                addToHistory(cmd, output);
            } else if (cmd.includes('nombre') || cmd.includes('name')) {
                addToHistory(cmd, `👋 ¡Hola! Has escrito: "${cmd}". ¡Bienvenido a la terminal interactiva!`);
            } else {
                addToHistory(cmd, `Comando no reconocido: "${cmd}". Escribe "help" para ver los comandos disponibles`, true);
            }
            
            // Limpiar input
            const inputField = document.getElementById('userInput');
            inputField.value = '';
            
            // Actualizar instrucción si es necesario
            updateInstruction();
        }

        // Simular escritura automática (para demo)
        async function simulateTyping(text) {
            const inputField = document.getElementById('userInput');
            inputField.value = '';
            inputField.focus();
            
            for (let i = 0; i < text.length; i++) {
                inputField.value += text[i];
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
            processCommand(text);
        }

        // Iniciar demo interactiva
        function startDemo() {
            setTimeout(() => {
                addToHistory('sistema', '🎯 <strong>¡DEMOSTRACIÓN GUIADA!</strong><br><br>📌 <span style="color:#ffc107">PASO 1:</span> Haz clic en cualquier comando verde de arriba<br>📌 <span style="color:#ffc107">PASO 2:</span> Escribe "click" en el campo de texto<br>📌 <span style="color:#ffc107">PASO 3:</span> Escribe "teclear" para ver instrucciones<br><br>✨ ¡Tú decides qué hacer!');
            }, 500);
        }

        // Actualizar instrucción según el contexto
        function updateInstruction() {
            const instructionDiv = document.getElementById('highlightInstruction');
            const history = document.getElementById('history').children.length;
            
            if (history === 0) {
                instructionDiv.innerHTML = '👆 <span>HAZ CLIC AQUÍ</span> 👆<br><small>Escribe <strong>iniciar</strong> o haz clic en "help"</small>';
            } else if (history > 3) {
                instructionDiv.innerHTML = '🎯 <span>¡VAS MUY BIEN!</span> 🎯<br><small>Prueba escribir: <strong>demo</strong> o <strong>comandos</strong></small>';
            } else {
                instructionDiv.innerHTML = '💡 <span>CONSEJO:</span> 💡<br><small>Escribe <strong>teclear</strong> para instrucciones detalladas</small>';
            }
        }

        // Mostrar ayuda flotante
        function showHelp() {
            addToHistory('ayuda', `
                🆘 <strong>GUÍA RÁPIDA</strong><br><br>
                🖱️ <strong>CLIC:</strong> En los comandos verdes o en el campo de texto<br>
                ⌨️ <strong>TECLEAR:</strong> Escribe help, iniciar, click, teclear, demo<br>
                🎯 <strong>OBJETIVO:</strong> Seguir las instrucciones resaltadas en amarillo<br>
                <br>
                <span style="color:#ffc107">✨ ¡INTÉNTALO AHORA MISMO!</span>
            `);
        }

        // Utilidad para escapar HTML
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            const inputField = document.getElementById('userInput');
            const terminalContent = document.getElementById('terminalContent');
            
            // Evento para el input (ENTER)
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    processCommand(inputField.value);
                }
            });
            
            // Evento para clics en comandos (delegación de eventos)
            terminalContent.addEventListener('click', (e) => {
                const commandElement = e.target.closest('.command');
                if (commandElement) {
                    const command = commandElement.getAttribute('data-command') || commandElement.textContent.replace('$ ', '');
                    const cleanCommand = command.replace('$ ', '').trim();
                    
                    // Resaltar visualmente el clic
                    commandElement.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        commandElement.style.transform = '';
                    }, 150);
                    
                    // Ejecutar el comando
                    addToHistory(cleanCommand, `🎯 <strong>Comando ejecutado por clic</strong><br>${commands[cleanCommand] ? commands[cleanCommand].action() : 'Comando ejecutado'}`);
                    
                    // Actualizar instrucción
                    updateInstruction();
                }
            });
            
            // Focus automático en el input
            inputField.focus();
            
            // Actualizar instrucción inicial
            updateInstruction();
            
            // Mensaje de bienvenida dinámico
            setTimeout(() => {
                addToHistory('bienvenida', '✨ <strong>¡TERMINAL INTERACTIVA ACTIVADA!</strong><br><br>Puedes hacer clic en los comandos verdes o escribir en el campo de abajo.<br>¡Sigue las instrucciones resaltadas en AMARILLO!');
            }, 1000);
        });
