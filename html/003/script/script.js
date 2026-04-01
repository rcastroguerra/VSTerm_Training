// ======================  BASE DE COMANDOS ========================
const commands = {
    help: {
        desc: "Muestra ayuda",
        action: () => {
            return `
                📟 <strong>COMANDOS VSTERM32</strong><br>
                • <span style="color:#FFFF88">help</span>      - Esta ayuda<br>
                • <span style="color:#FFFF88">dir</span>       - Lista directorio virtual<br>
                • <span style="color:#FFFF88">ver</span>       - Versión del terminal<br>
                • <span style="color:#FFFF88">cls</span>       - Limpia la pantalla<br>
                • <span style="color:#FFFF88">iniciar</span>   - Inicia guía interactiva<br>
                • <span style="color:#FFFF88">demo</span>      - Demostración automática<br>
                • <span style="color:#FFFF88">clickhelp</span> - Instrucciones de clic<br>
                • <span style="color:#FFFF88">teclear</span>   - Consejos de tecleo<br>
                • <span style="color:#FFFF88">about</span>     - Info del sistema
            `;
        }
    },
    dir: {
        action: () => {
            return `Volumen en unidad C: VSTERM32_CRT<br> Directorio de C:\\TERMINAL<br> 04/01/2026  10:42 AM    &lt;DIR&gt;          SISTEMA<br> 04/01/2026  10:42 AM    &lt;DIR&gt;          COMANDOS<br> 01/03/2026  09:14 AM             1,024 VTERM.HLP<br> 15/03/2026  03:21 PM               512 CONFIG.SYS<br> 2 archivos              1,536 bytes<br> 2 dirs   bytes libres`;
        }
    },
    ver: {
        action: () => `VSTERM32 Versión 4.2 (Build 2026) - Modo Consola Directa. VT100 emulation.`
    },
    cls: {
        action: () => {
            const consoleDiv = document.getElementById('terminalConsole');
            const children = [...consoleDiv.children];
            children.forEach(child => {
                if (child.id !== 'dynamicInputLine') {
                    child.remove();
                }
            });
            addStaticHistoryLine('CLS', 'Pantalla limpiada. Terminal lista.');
            return null;
        }
    },
    iniciar: {
        action: () => {
            startGuidedTour();
            return `🚀 <strong>GUÍA INTERACTIVA INICIADA</strong><br>✨ Sigue las sugerencias: usa "clickhelp" o haz clic en comandos verdes.<br>🎯 Los botones de la esquina superior derecha también responden.`;
        }
    },
    demo: {
        action: async () => {
            simulateAutoCommand("help");
            return `🎬 <strong>Demostración:</strong> ejecutando comando "help"...`;
        }
    },
    clickhelp: {
        action: () => {
            return `🖱️ <strong>¿DÓNDE HACER CLIC?</strong><br>
                → En los botones verdes inferiores (help, demo, dir...)<br>
                → En el menú superior: File, Edit, Options...<br>
                → En el texto resaltado <span style="color:#FFFF99">[ HELP ]</span> dentro del bloque amarillo.<br>
                → <strong style="color:#FFAA66">En los botones de la esquina superior derecha: _ □ ✕</strong> (minimizar, maximizar, cerrar)<br>
                → También puedes escribir directamente en la consola.`;
        }
    },
    teclear: {
        action: () => {
            return `⌨️ <strong>ESCRITURA DIRECTA EN CONSOLA</strong><br>
                • Simplemente escribe tu comando y presiona ENTER.<br>
                • No hay caja separada: la línea de entrada está integrada al flujo.<br>
                • Ejemplo: escribe "help", "dir", "ver", "iniciar".<br>
                • También puedes escribir frases libres como "hola terminal".`;
        }
    },
    about: {
        action: () => `VSTERM32 - Terminal anfitrión para Windows. Interfaz de consola pura con botones de ventana en esquina superior derecha. Diseño vintage.`
    }
};

// Elementos DOM
const consoleContainer = document.getElementById('terminalConsole');

// Función para crear la línea de entrada activa (siempre presente al final)
function createInputLine() {
    const existing = document.getElementById('dynamicInputLine');
    if (existing) existing.remove();

    const inputDiv = document.createElement('div');
    inputDiv.className = 'active-input-line';
    inputDiv.id = 'dynamicInputLine';
    inputDiv.innerHTML = `
        <span class="input-prompt">VSTERM32&gt;&gt;</span>
        <input type="text" id="consoleInput" placeholder="Escribe aquí y presiona ENTER..." autocomplete="off" spellcheck="false">
        <span class="blink-cursor"></span>
    `;
    consoleContainer.appendChild(inputDiv);
    
    const inputField = document.getElementById('consoleInput');
    if (inputField) {
        inputField.focus();
        inputField.removeEventListener('keypress', handleEnterKey);
        inputField.addEventListener('keypress', handleEnterKey);
    }
    return inputDiv;
}

// Manejador global del ENTER
function handleEnterKey(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const inputField = e.target;
        const rawCommand = inputField.value.trim();
        if (rawCommand === "") {
            addStaticHistoryLine('', 'Comando vacío. Escribe help para ayuda.', true);
            inputField.value = '';
            inputField.focus();
            return;
        }
        processUserCommand(rawCommand);
        inputField.value = '';
        setTimeout(() => {
            const newInput = document.getElementById('consoleInput');
            if (newInput) newInput.focus();
        }, 20);
    }
}

// Función para agregar líneas al historial
function addStaticHistoryLine(command, outputHtml, isError = false) {
    const historyDiv = document.createElement('div');
    historyDiv.className = 'history-line';
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', second:'2-digit' });
    const borderColor = isError ? '#ff8866' : '#ffdd66';
    historyDiv.style.borderLeftColor = borderColor;
    const displayCommand = command === "" ? "<vacío>" : command;
    historyDiv.innerHTML = `
        <div class="cmd-row">
            <span class="prompt-label">VSTERM32&gt;</span>
            <span class="cmd-text">${escapeHtml(displayCommand)}</span>
            <span style="color:#ccaa77; font-size:10px;">[${timestamp}]</span>
        </div>
        <div class="output-text" style="${isError ? 'color:#ffaa99' : ''}">
            ${isError ? '⚠️ ' : '✓ '} ${outputHtml}
        </div>
    `;
    const inputLineDiv = document.getElementById('dynamicInputLine');
    if (inputLineDiv) {
        consoleContainer.insertBefore(historyDiv, inputLineDiv);
    } else {
        consoleContainer.appendChild(historyDiv);
    }
    historyDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Procesar comando desde el input integrado
function processUserCommand(cmd) {
    const lowerCmd = cmd.toLowerCase();
    
    if (lowerCmd === 'cls') {
        const allHistory = document.querySelectorAll('#terminalConsole .history-line');
        allHistory.forEach(line => line.remove());
        addStaticHistoryLine('CLS', 'Pantalla borrada. Terminal lista.');
        createInputLine();
        return;
    }
    
    if (commands[lowerCmd]) {
        const output = commands[lowerCmd].action();
        if (lowerCmd !== 'cls' && output !== null) {
            addStaticHistoryLine(cmd, output);
        } else if (lowerCmd !== 'cls') {
            addStaticHistoryLine(cmd, "Comando ejecutado.");
        }
    } 
    else if (cmd.match(/nombre/i) || cmd.match(/hello/i) || cmd.match(/hola/i) || cmd.match(/terminal/i)) {
        addStaticHistoryLine(cmd, `👋 ¡Respuesta! Escribiste: "${escapeHtml(cmd)}". Terminal interactiva VSTERM32 lista.`);
    }
    else {
        addStaticHistoryLine(cmd, `Comando no reconocido: "${escapeHtml(cmd)}". Usa "help" para lista.`, true);
    }
    
    const inputElem = document.getElementById('consoleInput');
    if (inputElem) inputElem.focus();
}

// Tour guiado
function startGuidedTour() {
    setTimeout(() => {
        addStaticHistoryLine('GUIA', '✨ <strong>TOUR INTERACTIVO</strong><br>📌 1) Escribe "clickhelp" para aprender sobre clics.<br>📌 2) Prueba los comandos rápidos verdes.<br>📌 3) El menú superior también responde.<br>📌 4) <strong style="color:#FFAA66">Botones esquina superior derecha: minimizar, maximizar, cerrar</strong><br>🎯 ¡Explora!');
    }, 100);
}

// Simular escritura automática
async function simulateAutoCommand(cmdText) {
    const inputField = document.getElementById('consoleInput');
    if (!inputField) return;
    inputField.value = '';
    inputField.focus();
    for (let ch of cmdText) {
        inputField.value += ch;
        await new Promise(r => setTimeout(r, 100));
    }
    await new Promise(r => setTimeout(r, 300));
    const event = new KeyboardEvent('keypress', { key: 'Enter', bubbles: true });
    inputField.dispatchEvent(event);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Configurar eventos globales (menús y botones de ventana)
function setupGlobalEvents() {
    // Menús superiores
    const menuItems = document.querySelectorAll('[data-menu]');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const menuName = item.getAttribute('data-menu');
            addStaticHistoryLine(`MENU:${menuName}`, `Opción "${menuName}" seleccionada (simulación de terminal anfitrión).`);
        });
    });
    
    // BOTONES DE VENTANA - ESQUINA SUPERIOR DERECHA
    const minBtn = document.getElementById('btnMinimize');
    const maxBtn = document.getElementById('btnMaximize');
    const closeBtn = document.getElementById('btnClose');
    
    if (minBtn) {
        minBtn.addEventListener('click', () => {
            addStaticHistoryLine('SYS', 'Minimizar ventana (efecto visual) - Terminal reducida');
            const term = document.querySelector('.vsterminal');
            term.style.transform = 'scale(0.97)';
            term.style.transition = 'transform 0.15s';
            setTimeout(() => {
                term.style.transform = '';
            }, 200);
        });
    }
    
    if (maxBtn) {
        maxBtn.addEventListener('click', () => {
            addStaticHistoryLine('SYS', 'Maximizar ventana (simulado) - Modo pantalla completa virtual');
            const term = document.querySelector('.vsterminal');
            if (term.style.width === '98%') {
                term.style.width = '';
                term.style.maxWidth = '100%';
                addStaticHistoryLine('SYS', 'Restaurar tamaño original');
            } else {
                term.style.width = '98%';
                term.style.maxWidth = '98%';
                addStaticHistoryLine('SYS', 'Ventana maximizada (simulación)');
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if(confirm("¿Cerrar sesión de terminal? Se recargará la página para reiniciar")) {
                addStaticHistoryLine('SYS', 'Cerrando terminal...');
                setTimeout(() => location.reload(), 300);
            } else {
                addStaticHistoryLine('SYS', 'Operación cancelada');
            }
        });
    }
    
    // Comandos rápidos (botones verdes)
    const quickCmds = document.querySelectorAll('.inline-cmd');
    quickCmds.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) {
                const inputField = document.getElementById('consoleInput');
                if (inputField) {
                    inputField.value = cmd;
                    const fakeEvent = new KeyboardEvent('keypress', { key: 'Enter', bubbles: true });
                    inputField.dispatchEvent(fakeEvent);
                } else {
                    processUserCommand(cmd);
                }
            }
            e.stopPropagation();
        });
    });
    
    // Botón HELP del bloque instrucción
    const helpQuick = document.getElementById('helpQuickBtn');
    if (helpQuick) {
        helpQuick.addEventListener('click', () => {
            const inputFld = document.getElementById('consoleInput');
            if (inputFld) {
                inputFld.value = 'help';
                const ev = new KeyboardEvent('keypress', { key: 'Enter', bubbles: true });
                inputFld.dispatchEvent(ev);
            } else {
                processUserCommand('help');
            }
        });
    }
}

// Inicialización
function initTerminal() {
    createInputLine();
    setupGlobalEvents();
    setTimeout(() => {
        addStaticHistoryLine('SISTEMA', '✅ Consola interactiva lista. El menú está debajo del título y los botones en esquina superior derecha.');
    }, 400);
    const inputField = document.getElementById('consoleInput');
    if (inputField) inputField.focus();
    
    consoleContainer.addEventListener('click', (e) => {
        const inp = document.getElementById('consoleInput');
        if (inp && e.target !== inp && !e.target.closest('.win-btn')) inp.focus();
    });
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initTerminal);