import Sidebar from '@/app/components/sidebar/Sidebar';
import ConversationList from './components/ConversationList';
import getConverstaions from '@/app/actions/getConversations';
import getUsers from '../actions/getUsers';

export default async function conversationLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConverstaions();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
