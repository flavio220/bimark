'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useT } from '@/i18n/useTranslation';

const DEMO = [
  { id: 'conv-1', contact: 'TechSupply Co.', avatar: 'T', email: 'techsupply@example.com', lastMessage: 'Votre commande a été expédiée ce matin.', lastTime: '09:15', unread: 1,
    messages: [
      { id: 1, from: 'buyer', text: 'Bonjour, où en est ma commande CMD-0001 ?', time: '08:50', date: "Aujourd'hui" },
      { id: 2, from: 'seller', text: 'Bonjour ! Votre commande a été expédiée ce matin. Numéro de suivi : TRK-BJ-2024-0099', time: '09:15', date: "Aujourd'hui" },
    ] },
  { id: 'conv-2', contact: 'Mobilier Plus', avatar: 'M', email: 'mobilierplus@example.com', lastMessage: 'Oui, nous livrons bien à Cotonou.', lastTime: 'Hier', unread: 0,
    messages: [
      { id: 1, from: 'buyer', text: 'Est-ce que vous livrez à Cotonou ?', time: '14:00', date: 'Hier' },
      { id: 2, from: 'seller', text: 'Oui, nous livrons bien à Cotonou. Délai 3 à 5 jours ouvrables.', time: '14:30', date: 'Hier' },
    ] },
];

function ChatView({ conv, onBack, onSend, t }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [conv?.messages]);
  const send = () => { if (!input.trim()) return; onSend(input.trim()); setInput(''); };
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <button onClick={onBack} className="lg:hidden p-1 text-muted-foreground hover:text-foreground"><Icon name="ArrowLeftIcon" size={18} /></button>
        <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-sm">{conv.avatar}</div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm">{conv.contact}</p>
          <a href={`mailto:${conv.email}`} className="text-xs text-primary hover:underline">{conv.email}</a>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conv.messages.map((msg, i) => {
          const showDate = i === 0 || conv.messages[i-1].date !== msg.date;
          return (
            <div key={msg.id}>
              {showDate && <div className="text-center my-2"><span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">{msg.date}</span></div>}
              <div className={`flex ${msg.from === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-subtle ${msg.from === 'buyer' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-card border border-border text-foreground rounded-bl-sm'}`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === 'buyer' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground'}`}>{msg.time}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder={t('dashboard.writeMessage')}
            className="flex-1 px-4 py-2.5 border border-border rounded-full bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <button onClick={send} disabled={!input.trim()}
            className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-40">
            <Icon name="PaperAirplaneIcon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BuyerMessagesManager() {
  const { t } = useT();
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [search, setSearch] = useState('');
  const [mobileView, setMobileView] = useState('list');

  useEffect(() => {
    const stored = localStorage.getItem('bimark_buyer_messages');
    setConversations(stored ? JSON.parse(stored) : DEMO);
  }, []);

  const persist = (list) => { setConversations(list); localStorage.setItem('bimark_buyer_messages', JSON.stringify(list)); };

  const openConv = (conv) => {
    persist(conversations.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
    setActiveConv({ ...conv, unread: 0 });
    setMobileView('chat');
  };

  const sendMessage = (text) => {
    if (!activeConv) return;
    const msg = { id: Date.now(), from: 'buyer', text, time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), date: t('dashboard.today') };
    const updatedConv = { ...activeConv, messages: [...activeConv.messages, msg], lastMessage: text, lastTime: msg.time };
    persist(conversations.map(c => c.id === activeConv.id ? updatedConv : c));
    setActiveConv(updatedConv);
  };

  const filtered = conversations.filter(c =>
    c.contact.toLowerCase().includes(search.toLowerCase()) || c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );
  const totalUnread = conversations.reduce((s, c) => s + (c.unread || 0), 0);

  const ConvList = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground mb-3">
          {t('dashboard.messages')}{totalUnread > 0 && <span className="ml-2 text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">{totalUnread}</span>}
        </h2>
        <div className="relative">
          <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('dashboard.searchConv')}
            className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {filtered.length === 0
          ? <div className="p-8 text-center"><Icon name="ChatBubbleLeftRightIcon" size={28} className="text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">{t('dashboard.noMessages')}</p></div>
          : filtered.map(conv => (
            <button key={conv.id} onClick={() => openConv(conv)}
              className={`w-full flex items-start gap-3 p-4 text-left hover:bg-muted transition-smooth ${activeConv?.id === conv.id ? 'bg-primary/5 border-l-2 border-primary' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${conv.unread > 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>{conv.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-sm ${conv.unread > 0 ? 'font-bold' : 'font-medium'} text-foreground`}>{conv.contact}</span>
                  <span className="text-xs text-muted-foreground">{conv.lastTime}</span>
                </div>
                <p className={`text-xs truncate ${conv.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">{conv.unread}</span>}
            </button>
          ))}
      </div>
    </div>
  );

  return (
    <main className="lg:ml-64 pt-16 h-screen bg-background overflow-hidden">
      <div className="lg:hidden h-full">
        {mobileView === 'list'
          ? <div className="h-full bg-card">{ConvList}</div>
          : activeConv && <ChatView conv={activeConv} onBack={() => setMobileView('list')} onSend={sendMessage} t={t} />}
      </div>
      <div className="hidden lg:flex h-full">
        <div className="w-72 bg-card border-r border-border flex-shrink-0 overflow-hidden">{ConvList}</div>
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeConv
            ? <ChatView conv={activeConv} onBack={() => {}} onSend={sendMessage} t={t} />
            : <div className="flex-1 flex items-center justify-center p-8 text-center">
                <div>
                  <Icon name="ChatBubbleLeftRightIcon" size={40} className="text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium text-foreground mb-1">{t('dashboard.noConvSelected')}</p>
                  <p className="text-sm text-muted-foreground">{t('buyer.mySuppliers')}</p>
                </div>
              </div>}
        </div>
      </div>
    </main>
  );
}
