import React, { useState } from 'react';
import { 
  AlertTriangle, Activity, Stethoscope, Syringe, 
  ClipboardCheck, Wind, Info, AlertOctagon, 
  CheckCircle2, Check, ArrowDown, GitMerge
} from 'lucide-react';

export default function GuiaAsma() {
  const [activeTab, setActiveTab] = useState('evaluacion');
  
  // Estado de la calculadora de gravedad
  const [symptoms, setSymptoms] = useState({
    drowsy: false, cyanosis: false, silentChest: false, pefBelow50: false,
    hrAbove120: false, rrAbove30: false, accessoryMuscles: false,
    spo2Below90: false, talksInWords: false
  });

  const handleSymptomChange = (symptom) => {
    setSymptoms(prev => ({ ...prev, [symptom]: !prev[symptom] }));
  };

  const calculateSeverity = () => {
    if (symptoms.drowsy || symptoms.cyanosis || symptoms.silentChest || symptoms.spo2Below90) {
      return { 
        level: 'Amenaza de Vida / Paro Inminente', 
        bgColor: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-900', iconColor: 'text-red-600',
        icon: AlertOctagon, desc: 'Requiere atención inmediata. Considerar intubación e ingreso a UCI.'
      };
    }
    if (symptoms.pefBelow50 || symptoms.hrAbove120 || symptoms.rrAbove30 || symptoms.accessoryMuscles || symptoms.talksInWords) {
      return { 
        level: 'Exacerbación Severa', 
        bgColor: 'bg-orange-50', borderColor: 'border-orange-500', textColor: 'text-orange-900', iconColor: 'text-orange-500',
        icon: AlertTriangle, desc: 'Tratamiento intensivo con SABA/Ipratropio, corticoides sistémicos y considerar Magnesio.'
      };
    }
    return { 
      level: 'Exacerbación Leve a Moderada', 
      bgColor: 'bg-green-50', borderColor: 'border-green-500', textColor: 'text-green-900', iconColor: 'text-green-600',
      icon: CheckCircle2, desc: 'Manejo con SABA, oxígeno si es necesario y corticoides orales.'
    };
  };

  const severity = calculateSeverity();
  const SeverityIcon = severity.icon;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      
      {/* Encabezado de la Guía */}
      <header className="mb-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-200">
            <Wind className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Protocolo de Asma Aguda</h1>
            <p className="text-slate-500 text-sm font-medium italic">Referencia: UpToDate 2026</p>
          </div>
        </div>
      </header>

      {/* Navegación por Pestañas */}
      <nav className="flex flex-wrap gap-2 mb-8 bg-slate-200/50 p-1.5 rounded-2xl w-fit">
        <TabButton label="1. Evaluación" id="evaluacion" active={activeTab} setter={setActiveTab} icon={<Stethoscope size={16}/>} />
        <TabButton label="2. Labs" id="laboratorios" active={activeTab} setter={setActiveTab} icon={<Activity size={16}/>} />
        <TabButton label="3. Tratamiento" id="tratamiento" active={activeTab} setter={setActiveTab} icon={<Syringe size={16}/>} />
        <TabButton label="4. Reevaluación" id="reevaluacion" active={activeTab} setter={setActiveTab} icon={<ClipboardCheck size={16}/>} />
        <TabButton label="5. Ventilación" id="ventilacion" active={activeTab} setter={setActiveTab} icon={<Wind size={16}/>} />
        <TabButton label="6. Algoritmo" id="algoritmo" active={activeTab} setter={setActiveTab} icon={<GitMerge size={16}/>} />
      </nav>

      {/* Contenido Dinámico */}
      <div className="min-h-[500px]">
        
        {/* PESTAÑA 1: EVALUACIÓN */}
        {activeTab === 'evaluacion' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border-l-[12px] shadow-sm flex items-start gap-5 transition-all duration-300 ${severity.bgColor} ${severity.borderColor} ${severity.textColor}`}>
              <SeverityIcon className={`w-12 h-12 flex-shrink-0 ${severity.iconColor}`} />
              <div>
                <h3 className="text-2xl font-bold mb-1">{severity.level}</h3>
                <p className="text-lg font-medium opacity-90">{severity.desc}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                <h4 className="font-bold text-red-800 text-lg mb-4 flex items-center gap-2 underline decoration-red-200">Signos Críticos (Amenaza de Vida)</h4>
                <SymptomToggle label="Somnolencia o confusión mental" id="drowsy" checked={symptoms.drowsy} onChange={handleSymptomChange} danger />
                <SymptomToggle label="Cianosis manifiesta" id="cyanosis" checked={symptoms.cyanosis} onChange={handleSymptomChange} danger />
                <SymptomToggle label="Tórax silente (ausencia de sibilancias)" id="silentChest" checked={symptoms.silentChest} onChange={handleSymptomChange} danger />
                <SymptomToggle label="SpO2 &lt; 90% (aire ambiente)" id="spo2Below90" checked={symptoms.spo2Below90} onChange={handleSymptomChange} danger />
              </div>

              <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
                <h4 className="font-bold text-orange-800 text-lg mb-4 flex items-center gap-2 underline decoration-orange-200">Signos Severos</h4>
                <SymptomToggle label="PEF (Flujo Pico) ≤ 50% predicho" id="pefBelow50" checked={symptoms.pefBelow50} onChange={handleSymptomChange} />
                <SymptomToggle label="FC &gt; 120 lpm / FR &gt; 30 rpm" id="hrAbove120" checked={symptoms.hrAbove120} onChange={handleSymptomChange} />
                <SymptomToggle label="Uso de músculos accesorios" id="accessoryMuscles" checked={symptoms.accessoryMuscles} onChange={handleSymptomChange} />
                <SymptomToggle label="Habla solo palabras sueltas" id="talksInWords" checked={symptoms.talksInWords} onChange={handleSymptomChange} />
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 2: LABORATORIOS */}
        {activeTab === 'laboratorios' && (
          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard title="Flujo Espiratorio Máximo (PEF)" color="blue">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Mejor medida objetiva</strong> de la gravedad del flujo de aire.</li>
                <li><strong>Severo:</strong> PEF ≤ 50% (normalmente &lt; 200 L/min).</li>
                <li><strong>Moderado:</strong> PEF 50% - 70%.</li>
                <li className="text-red-600 font-medium italic">No forzar la prueba si hay insuficiencia respiratoria inminente.</li>
              </ul>
            </InfoCard>

            <InfoCard title="Oximetría y Gasometría (ABG)" color="purple">
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Objetivo SpO2:</strong> 93-95% (&gt;95% en embarazadas).</li>
                <li><strong>Alerta ABG:</strong> Una PaCO2 "normal" (≥ 42 mmHg) es signo de fatiga muscular y falla inminente.</li>
              </ul>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-xs">
                <strong>Indicación de ABG:</strong> Deterioro clínico, PEF &lt; 25% post-tratamiento o alteración mental.
              </div>
            </InfoCard>

            <InfoCard title="Radiografía de Tórax" color="slate">
              <p className="mb-2"><strong>No es rutinaria.</strong> Solicitar solo si sospecha de:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Neumotórax o neumomediastino.</li>
                <li>Neumonía (fiebre, esputo purulento).</li>
                <li>Falla cardíaca o dolor torácico inexplicable.</li>
              </ul>
            </InfoCard>
          </div>
        )}

        {/* PESTAÑA 3: TRATAMIENTO */}
        {activeTab === 'tratamiento' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 border-b pb-2">Protocolo de la Primera Hora</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <DrugCard drug="SABA (Salbutamol)" dose="2.5-5 mg Nebulizado ó 4-8 puffs MDI+espaciador" frequency="Cada 20 min x 3 dosis" />
              <DrugCard drug="SAMA (Ipratropio)" dose="500 mcg Nebulizado ó 4-8 puffs MDI+espaciador" frequency="Cada 20 min x 3 dosis (en crisis severas)" />
              <DrugCard drug="Corticoides" dose="Prednisona 40-60 mg VO ó Metilprednisolona 40-60 mg IV" frequency="Dosis temprana (dentro de la 1ra hora)" />
              <DrugCard drug="Magnesio IV" dose="2 g IV pasados en 20 minutos" frequency="Dosis única si no responde a terapia inicial" />
            </div>
            
            <div className="bg-orange-50 border border-orange-200 p-5 rounded-2xl">
              <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2"><AlertTriangle size={18}/> Casos Especiales</h4>
              <p className="text-sm text-orange-800"><strong>Adrenalina IM:</strong> 0.3-0.5 mg solo si hay anafilaxia o incapacidad de inhalar.</p>
              <p className="text-sm text-orange-800 mt-1"><strong>Oxígeno:</strong> Titular para evitar FiO2 excesiva que aumente la hipercapnia.</p>
            </div>
          </div>
        )}

        {/* PESTAÑA 4: REEVALUACIÓN */}
        {activeTab === 'reevaluacion' && (
          <div className="grid md:grid-cols-3 gap-6">
            <DispositionCard title="Buena Respuesta" pef="&gt; 80%" action="Alta Médica" color="green">
              <p>Síntomas resueltos. Receta: Prednisona 5-7 días, SABA PRN e iniciar ICS (Corticoide inhalado).</p>
            </DispositionCard>
            <DispositionCard title="Incompleta" pef="60 - 80%" action="Observar 1-3h" color="yellow">
              <p>Persisten sibilancias leves. Individualizar ingreso si hay mala adherencia o historia de asma fatal.</p>
            </DispositionCard>
            <DispositionCard title="Mala Respuesta" pef="&lt; 60%" action="Ingreso Hospitalario" color="red">
              <p>Síntomas persistentes o SpO2 cayendo. Trasladar a piso o UCI según estabilidad.</p>
            </DispositionCard>
          </div>
        )}

        {/* PESTAÑA 5: VENTILACIÓN */}
        {activeTab === 'ventilacion' && (
          <div className="space-y-6">
            <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg border border-slate-700">
              <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2"><Wind size={20}/> Parámetros de Ventilación Mecánica</h3>
              <div className="grid md:grid-cols-2 gap-6 font-mono text-sm">
                <div className="space-y-2 border-r border-slate-700 pr-4">
                  <p className="flex justify-between"><span>Modo:</span> <span className="text-green-400">Controlado x Volumen</span></p>
                  <p className="flex justify-between"><span>Volumen Tidal:</span> <span className="text-green-400">6-8 mL/kg (bajo)</span></p>
                  <p className="flex justify-between"><span>Frec. Resp:</span> <span className="text-green-400">10-12 rpm (baja)</span></p>
                </div>
                <div className="space-y-2">
                  <p className="flex justify-between"><span>Flujo Insp:</span> <span className="text-green-400">60-75 L/min (alto)</span></p>
                  <p className="flex justify-between"><span>Relación I:E:</span> <span className="text-green-400">1:3 a 1:5 (prolongada)</span></p>
                  <p className="flex justify-between"><span>PEEP:</span> <span className="text-green-400">5 cm H2O (inicial)</span></p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-red-200 p-4 rounded-xl bg-red-50">
                <h4 className="font-bold text-red-900 mb-1 flex items-center gap-2"><AlertOctagon size={16}/> Auto-PEEP</h4>
                <p className="text-xs text-red-800 leading-relaxed">Atrapamiento de aire. Si causa hipotensión: <strong>Desconectar ventilador temporalmente</strong> y fluidoterapia.</p>
              </div>
              <div className="border border-blue-200 p-4 rounded-xl bg-blue-50">
                <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2"><Info size={16}/> Hipercapnia Permisiva</h4>
                <p className="text-xs text-blue-800 leading-relaxed">Se acepta PaCO2 elevada para evitar barotrauma (presiones altas). El pulmón asmático es frágil.</p>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 6: ALGORITMO FINAL */}
        {activeTab === 'algoritmo' && (
          <div className="flex flex-col items-center py-8">
            <FlowStep text="1. Triage y Evaluación inicial (PEF, Clínica)" color="slate" />
            <ArrowDown className="text-slate-300 my-2" />
            <FlowStep text="2. Tratamiento 1ra Hora (SABA + SAMA + Corticoide)" color="blue" />
            <ArrowDown className="text-slate-300 my-2" />
            <FlowStep text="3. Reevaluar PEF a los 60 min" color="slate" border />
            <ArrowDown className="text-slate-300 my-2" />
            <div className="grid grid-cols-3 gap-3 w-full max-w-2xl text-[10px] font-bold">
              <div className="bg-green-100 border-2 border-green-500 p-3 rounded-xl text-center shadow-sm">PEF &gt; 80%<br/><span className="text-green-800">ALTA MÉDICA</span></div>
              <div className="bg-yellow-100 border-2 border-yellow-500 p-3 rounded-xl text-center shadow-sm">PEF 60-80%<br/><span className="text-yellow-800">OBSERVAR 1-3H</span></div>
              <div className="bg-red-100 border-2 border-red-500 p-3 rounded-xl text-center shadow-sm">PEF &lt; 60%<br/><span className="text-red-800">INGRESO / UCI</span></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// COMPONENTES AUXILIARES ESTILIZADOS
function TabButton({ label, id, active, setter, icon }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => setter(id)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all
        ${isActive 
          ? 'bg-white text-blue-700 shadow-sm border border-slate-100' 
          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-300/30'
        }`}
    >
      {icon} {label}
    </button>
  );
}

function SymptomToggle({ label, checked, onChange, id, danger }) {
  const activeColor = danger ? 'bg-red-500 border-red-500' : 'bg-orange-500 border-orange-500';
  return (
    <label className={`flex items-center justify-between p-3.5 mb-3 rounded-xl border-2 cursor-pointer transition-all
      ${checked ? (danger ? 'bg-red-50 border-red-300' : 'bg-orange-50 border-orange-300') : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}>
      <input type="checkbox" className="hidden" checked={checked} onChange={() => onChange(id)} />
      <span className={`text-sm font-bold ${checked ? (danger ? 'text-red-900' : 'text-orange-900') : 'text-slate-600'}`}>{label}</span>
      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${checked ? activeColor : 'bg-white border-slate-300'}`}>
        {checked && <Check className="text-white w-4 h-4 stroke-[4]" />}
      </div>
    </label>
  );
}

function InfoCard({ title, icon, children, color }) {
  const colors = {
    blue: 'border-blue-200 bg-blue-50/30 text-blue-900',
    purple: 'border-purple-200 bg-purple-50/30 text-purple-900',
    slate: 'border-slate-200 bg-slate-50/30 text-slate-900'
  };
  return (
    <div className={`border rounded-2xl overflow-hidden shadow-sm bg-white`}>
      <div className={`px-5 py-3 border-b font-bold flex items-center gap-2 ${colors[color]}`}>
        {icon} {title}
      </div>
      <div className="p-5 text-sm text-slate-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function DrugCard({ drug, dose, frequency }) {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:border-blue-300 transition-colors">
      <h4 className="font-extrabold text-blue-900 mb-1">{drug}</h4>
      <p className="text-sm font-bold text-slate-700 mb-1">{dose}</p>
      <p className="text-xs text-slate-500 italic">{frequency}</p>
    </div>
  );
}

function DispositionCard({ title, pef, action, children, color }) {
  const styles = {
    green: 'border-green-200 bg-green-50 text-green-900 shadow-green-100',
    yellow: 'border-yellow-200 bg-yellow-50 text-yellow-900 shadow-yellow-100',
    red: 'border-red-200 bg-red-50 text-red-900 shadow-red-100'
  };
  return (
    <div className={`border-2 rounded-2xl p-6 shadow-md transition-transform hover:-translate-y-1 ${styles[color]}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-black">{title}</h3>
        <span className="bg-white/80 px-2 py-1 rounded text-xs font-black border border-current">{pef}</span>
      </div>
      <div className="text-sm leading-relaxed mb-4">{children}</div>
      <div className="font-black text-center border-t border-black/10 pt-4 uppercase tracking-wider">{action}</div>
    </div>
  );
}

function FlowStep({ text, color, border }) {
  const themes = {
    slate: 'bg-slate-800 text-white shadow-slate-200',
    blue: 'bg-blue-600 text-white shadow-blue-200'
  };
  return (
    <div className={`w-full max-w-md p-4 rounded-2xl text-center font-bold shadow-lg ${themes[color]} ${border ? 'border-2 border-slate-300' : ''}`}>
      {text}
    </div>
  );
}