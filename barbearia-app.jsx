import React, { useState } from 'react';
import { Calendar, Clock, User, Scissors, Sparkles, ShoppingCart } from 'lucide-react';

export default function BarbeariaApp() {
  const [activeTab, setActiveTab] = useState('cortes');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [cart, setCart] = useState([]);

  const barbeiros = [
    { id: 1, nome: 'Gabriel Aguiar', especialidade: 'Cortes Clássicos' },
    { id: 2, nome: 'Elias Gomes', especialidade: 'Design de Barba' },
    { id: 3, nome: 'Iranilson Nogueira', especialidade: 'Cortes Modernos' }
  ];

  const servicos = {
    cortes: [
      { id: 1, nome: 'Corte', valor: 35 },
      { id: 2, nome: 'Corte + Barba', valor: 35 },
      { id: 3, nome: 'Russa', valor: 15 }
    ],
    tratamentos: [
      { id: 4, nome: 'Hidratação', valor: 40 },
      { id: 5, nome: 'Progressiva/Selagem', valor: 95, desde: true },
      { id: 6, nome: 'Luzes', valor: 100, desde: true },
      { id: 7, nome: 'Platinado', valor: 150, desde: true }
    ],
    pigmentacao: [
      { id: 8, nome: 'Pigmentação', valor: 40 },
      { id: 9, nome: 'Corte + Pigmentação', valor: 70 },
      { id: 10, nome: 'Corte + Sobrancelha + Barba', valor: 80 }
    ]
  };

  const horarios = {
    'segunda a sexta': { inicio: '09:00', fim: '20:00', almoco: true },
    'sabado': { inicio: '09:00', fim: '17:00', almoco: true },
    'domingo': { inicio: '09:00', fim: '13:00', almoco: false }
  };

  const getServicosAtivos = () => {
    return servicos[activeTab] || [];
  };

  const adicionarCarrinho = (servico) => {
    setCart([...cart, { ...servico, id: `${servico.id}-${Date.now()}` }]);
    setSelectedService(null);
  };

  const removerCarrinho = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalCarrinho = cart.reduce((acc, item) => acc + item.valor, 0);

  const timeSlots = Array.from({ length: 22 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${String(hour).padStart(2, '0')}:${minute}`;
  }).filter(time => {
    const [h] = time.split(':').map(Number);
    return h < 20;
  });

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      fontFamily: "'Playfair Display', 'Georgia', serif"
    }}>
      {/* Header Luxuoso */}
      <header className="border-b-2" style={{ borderColor: '#d4af37' }}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" 
                style={{ background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)' }}>
                <Scissors className="w-8 h-8" style={{ color: '#0a0a0a' }} />
              </div>
              <div>
                <h1 style={{ color: '#d4af37' }} className="text-4xl font-bold">BARBEARIA</h1>
                <p style={{ color: '#b8860b' }} className="text-sm tracking-widest">PREMIUM BARBERSHOP</p>
              </div>
            </div>
            <button className="relative p-3 rounded-full transition-all duration-300 hover:scale-110" 
              style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid #d4af37' }}>
              <ShoppingCart style={{ color: '#d4af37' }} className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Seção Principal */}
          <div className="col-span-2">
            {/* Barbeiros */}
            <section className="mb-12">
              <h2 style={{ color: '#d4af37' }} className="text-2xl font-bold mb-6 tracking-wider">BARBEIROS ESPECIALISTAS</h2>
              <div className="grid grid-cols-3 gap-4">
                {barbeiros.map(barbeiro => (
                  <div key={barbeiro.id} 
                    className="p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-105"
                    style={{ 
                      borderColor: selectedBarber?.id === barbeiro.id ? '#d4af37' : '#333',
                      background: selectedBarber?.id === barbeiro.id ? 'rgba(212, 175, 55, 0.1)' : '#1a1a1a'
                    }}
                    onClick={() => setSelectedBarber(barbeiro)}>
                    <User style={{ color: '#d4af37' }} className="w-8 h-8 mb-3" />
                    <h3 style={{ color: '#d4af37' }} className="font-bold text-lg">{barbeiro.nome}</h3>
                    <p style={{ color: '#888' }} className="text-sm">{barbeiro.especialidade}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Horários */}
            <section className="mb-12">
              <h2 style={{ color: '#d4af37' }} className="text-2xl font-bold mb-6 tracking-wider">HORÁRIOS DE FUNCIONAMENTO</h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(horarios).map(([dia, info]) => (
                  <div key={dia} className="p-4 rounded-lg" style={{ background: '#1a1a1a', border: '1px solid #333' }}>
                    <h3 style={{ color: '#d4af37' }} className="font-bold mb-2 capitalize">{dia}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock style={{ color: '#d4af37' }} className="w-4 h-4" />
                      <p style={{ color: '#ddd' }}>{info.inicio} - {info.fim}</p>
                    </div>
                    {info.almoco && (
                      <p style={{ color: '#888' }} className="text-xs">Almoço: 12h00 - 13h00</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Serviços com Abas */}
            <section className="mb-8">
              <h2 style={{ color: '#d4af37' }} className="text-2xl font-bold mb-6 tracking-wider">SERVIÇOS E VALORES</h2>
              
              {/* Abas */}
              <div className="flex gap-2 mb-6 border-b-2" style={{ borderColor: '#333' }}>
                {[
                  { key: 'cortes', label: '✂️ Cortes', icon: 'Scissors' },
                  { key: 'tratamentos', label: '💎 Tratamentos', icon: 'Sparkles' },
                  { key: 'pigmentacao', label: '🎨 Pigmentação', icon: 'Palette' }
                ].map(tab => (
                  <button key={tab.key}
                    className="pb-3 px-4 font-bold transition-all duration-300 border-b-2"
                    style={{
                      color: activeTab === tab.key ? '#d4af37' : '#888',
                      borderColor: activeTab === tab.key ? '#d4af37' : 'transparent'
                    }}
                    onClick={() => setActiveTab(tab.key)}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Serviços */}
              <div className="space-y-3">
                {getServicosAtivos().map(servico => (
                  <div key={servico.id} 
                    className="p-4 rounded-lg border-2 transition-all duration-300 hover:border-yellow-600 cursor-pointer group"
                    style={{ 
                      borderColor: '#333',
                      background: '#1a1a1a',
                      _hover: { background: 'rgba(212, 175, 55, 0.05)' }
                    }}
                    onClick={() => adicionarCarrinho(servico)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 style={{ color: '#d4af37' }} className="font-bold">{servico.nome}</h4>
                        {servico.desde && <p style={{ color: '#888' }} className="text-xs">A partir de</p>}
                      </div>
                      <span style={{ color: '#d4af37' }} className="text-lg font-bold">R$ {servico.valor}</span>
                    </div>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p style={{ color: '#888' }} className="text-xs">Clique para adicionar ao agendamento</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Agendamento */}
          <aside className="col-span-1 h-fit sticky top-8">
            <div className="rounded-lg p-6" style={{ 
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(180, 131, 12, 0.05) 100%)',
              border: '2px solid #d4af37'
            }}>
              <h3 style={{ color: '#d4af37' }} className="text-xl font-bold mb-6 tracking-wider">AGENDAR</h3>

              {/* Seleção de Barbeiro */}
              {selectedBarber && (
                <div className="mb-6 p-3 rounded" style={{ background: 'rgba(212, 175, 55, 0.1)', borderLeft: '3px solid #d4af37' }}>
                  <p style={{ color: '#888' }} className="text-xs mb-1">BARBEIRO SELECIONADO</p>
                  <p style={{ color: '#d4af37' }} className="font-bold">{selectedBarber.nome}</p>
                </div>
              )}

              {/* Data */}
              <div className="mb-6">
                <label style={{ color: '#d4af37' }} className="block text-sm font-bold mb-2">DATA</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded" style={{ 
                    background: '#0a0a0a',
                    border: '1px solid #d4af37',
                    color: '#d4af37'
                  }} />
              </div>

              {/* Hora */}
              {selectedDate && (
                <div className="mb-6">
                  <label style={{ color: '#d4af37' }} className="block text-sm font-bold mb-2">HORÁRIO</label>
                  <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 rounded" style={{ 
                      background: '#0a0a0a',
                      border: '1px solid #d4af37',
                      color: '#d4af37'
                    }}>
                    <option value="">Selecione um horário</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Resumo do Carrinho */}
              <div className="border-t-2" style={{ borderColor: '#333' }}>
                <h4 style={{ color: '#d4af37' }} className="font-bold mt-6 mb-4">SERVIÇOS SELECIONADOS ({cart.length})</h4>
                
                {cart.length === 0 ? (
                  <p style={{ color: '#888' }} className="text-sm text-center py-4">Nenhum serviço selecionado</p>
                ) : (
                  <div className="space-y-3 max-h-48 overflow-y-auto mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-start p-2 rounded" style={{ background: 'rgba(212, 175, 55, 0.05)' }}>
                        <div>
                          <p style={{ color: '#ddd' }} className="text-sm font-bold">{item.nome}</p>
                          <p style={{ color: '#d4af37' }} className="text-sm font-bold">R$ {item.valor}</p>
                        </div>
                        <button onClick={() => removerCarrinho(item.id)}
                          style={{ color: '#d4af37' }}
                          className="hover:text-red-400 transition-colors">✕</button>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <>
                    <div className="flex justify-between items-center mb-6 p-4 rounded" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                      <span style={{ color: '#888' }}>TOTAL</span>
                      <span style={{ color: '#d4af37' }} className="text-2xl font-bold">R$ {totalCarrinho}</span>
                    </div>

                    <button 
                      disabled={!selectedBarber || !selectedDate || !selectedTime}
                      className="w-full py-3 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                      style={{ 
                        background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                        color: '#0a0a0a'
                      }}
                      onClick={() => alert(`Agendamento confirmado!\nBarbeiro: ${selectedBarber.nome}\nData: ${selectedDate}\nHorário: ${selectedTime}\nTotal: R$ ${totalCarrinho}`)}>
                      CONFIRMAR AGENDAMENTO
                    </button>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t-2 py-8" style={{ borderColor: '#333' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p style={{ color: '#888' }}>© 2024 Barbearia Premium. Todos os direitos reservados.</p>
          <p style={{ color: '#b8860b' }} className="text-sm mt-2">Excelência em cada corte</p>
        </div>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          color: #ddd;
        }

        input::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }

        select option {
          background-color: #0a0a0a;
          color: #d4af37;
        }

        /* Scrollbar customizado */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #f4d03f;
        }
      `}</style>
    </div>
  );
}
