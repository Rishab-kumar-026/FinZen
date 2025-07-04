import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Edit3, Calendar, TrendingUp, CheckCircle, Trophy, PiggyBank, Smartphone, Plane, Car, Home, Gift, AlertCircle, Trash2 } from 'lucide-react';
import { FaInfoCircle } from 'react-icons/fa';
import BubbleBackground from './BubbleBackground';
import Confetti from 'react-confetti';

const goalIcons = [
  { name: 'Travel', icon: <Plane className="w-6 h-6" /> },
  { name: 'Gadget', icon: <Smartphone className="w-6 h-6" /> },
  { name: 'Car', icon: <Car className="w-6 h-6" /> },
  { name: 'Home', icon: <Home className="w-6 h-6" /> },
  { name: 'Gift', icon: <Gift className="w-6 h-6" /> },
  { name: 'Savings', icon: <PiggyBank className="w-6 h-6" /> },
];

const defaultGoals = [];

function getMonthsLeft(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  return Math.max(0, (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth()));
}

function getProjectedCompletion(goal) {
  if (!goal.monthly || !goal.saved || !goal.target) return null;
  const remaining = Math.max(0, goal.target - goal.saved);
  if (goal.monthly <= 0) return null;
  const months = Math.ceil(remaining / goal.monthly);
  const now = new Date();
  now.setMonth(now.getMonth() + months);
  return now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const achievementExamples = [
  { icon: <Trophy className="w-6 h-6 text-yellow-400 animate-bounce" />, text: 'Goal Achiever – Completed your Laptop Fund!' },
  { icon: <CheckCircle className="w-6 h-6 text-green-400 animate-pulse" />, text: 'Consistent Saver – 3 months of consistent saving!' },
];

const aiSuggestionsExamples = [
  { icon: <TrendingUp className="w-6 h-6 text-blue-400" />, text: 'Boost Your iPhone Fund – Reach your goal 2 months earlier by increasing monthly savings by ₹1,000!' },
  { icon: <AlertCircle className="w-6 h-6 text-teal-400" />, text: "Emergency Fund Priority – It's your financial safety net!" },
];

const goalCategories = [
  'Travel',
  'Gadget',
  'Car',
  'Home',
  'Gift',
  'Savings',
];

// Flirty Hindi messages per category
const flirtyMessages = {
  Travel: {
    nudge: 'Goa ki hawa lag gayi hai! Bas thoda aur bacha lo, bags pack karlo! 🏖️',
    achieved: 'Goa Trip Fund pura! Sunscreen lagana mat bhoolna 😎🌴',
  },
  Gadget: {
    nudge: 'Naya phone bas aane hi wala hai! Thoda aur bacha lo 📱✨',
    achieved: 'Badhai ho! Naya gadget lene ka time aa gaya! 🥳📱',
  },
  Car: {
    nudge: 'Car ki chaabi milne wali hai! Thoda aur bacha lo 🚗💨',
    achieved: 'Vroom vroom! Car fund complete, ab road trip! 🚗🎉',
  },
  Home: {
    nudge: 'Apna ghar sapna pura hone wala hai! Thoda aur bacha lo 🏠💖',
    achieved: 'Congratulations! Apna ghar, apni chhat! 🏠🥳',
  },
  Gift: {
    nudge: 'Gift dene ka mauka pass aa raha hai! Thoda aur bacha lo 🎁💝',
    achieved: 'Gift fund complete! Ab surprise ready karo! 🎁🎉',
  },
  Savings: {
    nudge: 'Emergency fund almost ready! Thoda aur bacha lo 💰🛡️',
    achieved: 'Emergency fund set! Ab tension free life! 💰😌',
  },
  default: {
    nudge: 'Bas thoda sa aur! Sapna poora hone wala hai 😍💸',
    achieved: 'Badhai ho! Tumne apna goal faad diya 🥳🔥',
  },
};

export default function SetGoals() {
  const [goals, setGoals] = useState(() => {
    try {
      const stored = localStorage.getItem('finzen_goals');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // Optionally log or ignore
    }
    return defaultGoals;
  });
  const [showModal, setShowModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', date: '', monthly: '', icon: 'Travel', category: 'Travel' });
  const [contributeGoal, setContributeGoal] = useState(null);
  const [contributeAmount, setContributeAmount] = useState('');
  const [editGoal, setEditGoal] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const dateInputRef = React.useRef(null);
  const [achievedGoals, setAchievedGoals] = useState(() => {
    try {
      const stored = localStorage.getItem('finzen_achieved_goals');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    localStorage.setItem('finzen_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    goals.forEach(goal => {
      const cat = goal.icon || 'default';
      const msg = flirtyMessages[cat] || flirtyMessages.default;
      if (goal.saved >= goal.target && !goal.achieved) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 7000);
        toast.success(msg.achieved, { icon: '🏆', duration: 4500, style: { background: 'linear-gradient(90deg,#a18cd1,#fbc2eb)', color: '#222', animation: 'bounce 1s' } });
        setGoals(gs => gs.map(g => g.id === goal.id ? { ...g, achieved: true, achievedDate: new Date().toISOString() } : g));
        setAchievedGoals(ag => ag.some(a => a.id === goal.id) ? ag : [...ag, { ...goal, achieved: true, achievedDate: new Date().toISOString() }]);
      } else if (goal.saved / goal.target >= 0.8 && !goal.nudged && goal.saved < goal.target) {
        toast(msg.nudge, { icon: '🌴', duration: 4500, style: { background: 'linear-gradient(90deg,#43e97b,#38f9d7)', color: '#222', animation: 'bounce 1s' } });
        setGoals(gs => gs.map(g => g.id === goal.id ? { ...g, nudged: true } : g));
      }
    });
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('finzen_achieved_goals', JSON.stringify(achievedGoals));
  }, [achievedGoals]);

  const handleCreateGoal = e => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target || !newGoal.date || !newGoal.monthly) {
      toast.error('Please fill all fields');
      return;
    }
    const now = new Date();
    const targetDate = new Date(newGoal.date);
    const months = (targetDate.getFullYear() - now.getFullYear()) * 12 + (targetDate.getMonth() - now.getMonth());
    const targetAmount = Number(newGoal.target);
    const monthly = Number(newGoal.monthly);
    if (months < 2 && targetAmount > 50000) {
      toast('Target date is too soon for such a big amount! Try a longer duration.', { icon: '⚠️', duration: 5000, style: { background: '#fffbe6', color: '#b45309' } });
      return;
    }
    if (monthly > 0 && months > 0 && (targetAmount / months > monthly * 1.5)) {
      toast('Monthly contribution is too low for this goal! Increase your monthly savings.', { icon: '⚠️', duration: 5000, style: { background: '#fffbe6', color: '#b45309' } });
      return;
    }
    const id = Date.now();
    setGoals([...goals, { ...newGoal, id, saved: 0, achieved: false, nudged: false }]);
    setShowModal(false);
    setNewGoal({ name: '', target: '', date: '', monthly: '', icon: 'Travel', category: 'Travel' });
    toast.success('Goal Created Successfully!', { duration: 4500 });
  };

  const handleContribute = (goalId) => {
    if (!contributeAmount || isNaN(contributeAmount) || Number(contributeAmount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    setGoals(goals.map(g => g.id === goalId ? { ...g, saved: Number(g.saved) + Number(contributeAmount) } : g));
    setContributeGoal(null);
    setContributeAmount('');
    toast.success('Contribution added!', { duration: 4500 });
  };

  const handleEditGoal = (goalId) => {
    if (!editValues.name || !editValues.target || !editValues.date || !editValues.monthly) {
      toast.error('Please fill all fields');
      return;
    }
    setGoals(goals.map(g => g.id === goalId ? { ...g, ...editValues } : g));
    setEditGoal(null);
    setEditValues({});
    toast.success('Goal updated!', { duration: 4500 });
  };

  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input[type="date"]::-webkit-calendar-picker-indicator {
        opacity: 0;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 pt-24 px-6 pb-8 sm:px-8 md:px-12">
      <Toaster position="top-right" toastOptions={{ duration: 4500 }} containerStyle={{ marginTop: '4.5rem' }} />
      <BubbleBackground />
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={400} />}
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-4">Your Financial Goals</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Track your savings progress and stay motivated as you reach your financial milestones.</p>
        <button onClick={() => setShowModal(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb] text-white font-semibold shadow-lg hover:scale-105 transition">+ Create New Goal</button>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto mb-12">
        {goals.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-16">
            <PiggyBank className="mx-auto w-12 h-12 mb-2 text-[#1db954]" />
            No goals yet. Start by creating one!
          </div>
        )}
        {goals.map(goal => {
          const iconObj = goalIcons.find(i => i.name === goal.icon) || goalIcons[0];
          const percent = Math.min(100, (goal.saved / goal.target) * 100);
          const monthsLeft = getMonthsLeft(goal.date);
          const remaining = Math.max(0, goal.target - goal.saved);
          const projected = getProjectedCompletion(goal);
          return (
            <div key={goal.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-3 relative">
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-10 h-10 flex items-center justify-center rounded-xl text-2xl font-bold shadow ${goal.achieved ? 'bg-white text-[#3B82F6]' : 'bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-white'}`}>{iconObj.icon}</span>
                <span className="font-bold text-lg text-gray-800 dark:text-white flex-1">{goal.name}</span>
                {!goal.achieved && <button onClick={() => { setEditGoal(goal.id); setEditValues(goal); }} className="text-blue-400 hover:text-blue-600"><Edit3 className="w-5 h-5" /></button>}
              </div>
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar className="w-4 h-4" /> Target: {new Date(goal.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                <div className="h-3 rounded-full transition-all duration-700" style={{ width: percent + '%', background: 'linear-gradient(90deg,#a18cd1,#fbc2eb)' }} />
              </div>
              <div className="flex flex-wrap gap-2 text-xs justify-between mb-2">
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded">✅ Saved: ₹{goal.saved.toLocaleString()}</div>
                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded">🏁 Target: ₹{goal.target.toLocaleString()}</div>
                <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">💸 Monthly: ₹{goal.monthly.toLocaleString()}</div>
                <div className="bg-pink-100 text-pink-700 px-2 py-1 rounded">💰 Remaining: ₹{remaining.toLocaleString()}</div>
                <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded">📅 Months Left: {monthsLeft}</div>
              </div>
              {!goal.achieved && (
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => { setContributeGoal(goal.id); setContributeAmount(''); }} className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#43e97b] to-[#38f9d7] text-white font-semibold shadow hover:scale-105 transition">➕ Add Money</button>
                </div>
              )}
              {projected && <div className="text-xs text-center text-gray-500 mt-2">Projected Completion: <span className="font-semibold">{projected}</span></div>}
              {goal.achieved && <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow animate-pulse">🎉 Achieved</div>}
              <span className="font-semibold text-purple-500">Progress: {percent.toFixed(1)}%</span>
              <button onClick={() => {
                const goalToDelete = goals.find(g => g.id === goal.id);
                setGoals(goals.filter(g => g.id !== goal.id));
                if (goalToDelete && goalToDelete.achieved) {
                  setAchievedGoals(ag => ag.some(a => a.id === goalToDelete.id) ? ag : [...ag, goalToDelete]);
                }
              }} className="absolute bottom-3 right-3 text-red-500 hover:text-red-700 text-2xl" title="Delete Goal"><Trash2 className="w-6 h-6" /></button>
            </div>
          );
        })}
      </div>

      {/* Achievements Section */}
      {achievedGoals.length > 0 && (
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white"><Trophy className="w-6 h-6 text-yellow-400" /> Achievements</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {achievedGoals.map((g, i) => {
              const iconObj = goalIcons.find(ic => ic.name === g.icon) || goalIcons[0];
              return (
                <div key={g.id} className="flex items-center gap-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 px-6 py-3 rounded-xl shadow animate-fade-in min-w-[260px] relative">
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl text-2xl font-bold shadow bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6]">{iconObj.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{g.name}</span>
                    <span className="text-xs text-gray-500">Achieved: {g.achievedDate ? new Date(g.achievedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
                    <span className="text-sm font-bold text-green-700">₹{Number(g.target).toLocaleString()}</span>
                  </div>
                  <button onClick={() => setAchievedGoals(ag => ag.filter(goal => goal.id !== g.id))} className="absolute top-2 right-2 text-red-500 hover:text-red-700" title="Remove from Achievements"><Trash2 className="w-5 h-5" /></button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create/Edit Goal Modal */}
      {(showModal || editGoal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <form onSubmit={editGoal ? e => { e.preventDefault(); handleEditGoal(editGoal); } : handleCreateGoal} className="bg-gray-900/90 rounded-2xl p-8 shadow-lg w-full max-w-md mx-auto animate-fade-in flex flex-col gap-6 max-h-[calc(100vh-120px)] overflow-y-auto justify-center mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">{editGoal ? 'Edit Goal' : 'Create New Goal'}</h2>
            <div className="mb-2">
              <label className="flex items-center gap-2 text-gray-200 font-semibold mb-1">Goal Name <FaInfoCircle title="E.g. Goa Trip with Friends" className="text-gray-400" /></label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 text-lg focus:outline-none" placeholder="e.g. Goa Trip with Friends" value={editGoal ? editValues.name : newGoal.name} onChange={e => editGoal ? setEditValues(v => ({ ...v, name: e.target.value })) : setNewGoal(v => ({ ...v, name: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label className="flex items-center gap-2 text-gray-200 font-semibold mb-1">Target Amount (₹) <FaInfoCircle title="How much do you want to save?" className="text-gray-400" /></label>
              <input type="number" className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 text-lg focus:outline-none" placeholder="e.g. 50000" value={editGoal ? editValues.target : newGoal.target} onChange={e => editGoal ? setEditValues(v => ({ ...v, target: e.target.value })) : setNewGoal(v => ({ ...v, target: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label className="text-gray-200 font-semibold mb-1">Target Date</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 text-lg focus:outline-none pr-12"
                  value={editGoal ? editValues.date : newGoal.date}
                  onChange={e => editGoal ? setEditValues(v => ({ ...v, date: e.target.value })) : setNewGoal(v => ({ ...v, date: e.target.value }))}
                  ref={dateInputRef}
                />
                <Calendar
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white cursor-pointer"
                  onClick={() => dateInputRef.current && dateInputRef.current.showPicker && dateInputRef.current.showPicker()}
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="flex items-center gap-2 text-gray-200 font-semibold mb-1">Monthly Contribution (₹) <FaInfoCircle title="How much will you save each month?" className="text-gray-400" /></label>
              <input type="number" className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 text-lg focus:outline-none" placeholder="e.g. 5000" value={editGoal ? editValues.monthly : newGoal.monthly} onChange={e => editGoal ? setEditValues(v => ({ ...v, monthly: e.target.value })) : setNewGoal(v => ({ ...v, monthly: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label className="flex items-center gap-2 text-gray-200 font-semibold mb-1">Select Category <FaInfoCircle title="Pick a goal type" className="text-gray-400" /></label>
              <select className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white text-lg focus:outline-none" value={editGoal ? editValues.icon : newGoal.icon} onChange={e => editGoal ? setEditValues(v => ({ ...v, icon: e.target.value })) : setNewGoal(v => ({ ...v, icon: e.target.value }))}>
                {goalCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="w-full py-2 text-white rounded-md font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600">{editGoal ? 'Save Changes' : 'Create Goal'}</button>
              <button type="button" className="w-full py-2 rounded-md font-semibold bg-gray-700 text-gray-200" onClick={() => { setShowModal(false); setEditGoal(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Contribute Modal */}
      {contributeGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form onSubmit={e => { e.preventDefault(); handleContribute(contributeGoal); }} className="bg-gray-900/90 rounded-2xl p-8 shadow-lg w-full max-w-md mx-auto animate-fade-in flex flex-col gap-6 mt-8 px-4 md:px-0">
            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text">Add Money to Goal</h2>
            <input type="number" className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 text-lg focus:outline-none mb-4" placeholder="Amount" value={contributeAmount} onChange={e => setContributeAmount(e.target.value)} />
            <div className="flex gap-2 mt-4">
              <button type="submit" className="w-full py-2 text-white rounded-md font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600">Add</button>
              <button type="button" className="w-full py-2 rounded-md font-semibold bg-gray-700 text-gray-200" onClick={() => setContributeGoal(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 