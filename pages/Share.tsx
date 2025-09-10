import ShareItemsForm from "@/components/share-items-form";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollView } from "react-native";

export function SharePage() {
    return (
        <ScrollView>
            <ShareItemsForm />
        </ScrollView>
    );
}
