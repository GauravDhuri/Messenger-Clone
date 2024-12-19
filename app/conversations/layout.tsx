import Sidebar from '@/app/components/sidebar/Sidebar';
import ConversationList from './components/ConversationList';
import getConverstaions from '@/app/actions/getConversations';

export default async function conversationLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConverstaions();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
