export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      cart: {
        Row: {
          created_at: string
          id: string
          product_id: string | null
          quantity: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_id?: string | null
          quantity?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string | null
          quantity?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
          sub_categories: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          sub_categories?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          sub_categories?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      offers: {
        Row: {
          category_ids: string[] | null
          created_at: string
          description: string | null
          discount_amount: number | null
          discount_percentage: number | null
          end_date: string | null
          id: string
          is_active: boolean | null
          product_ids: string[] | null
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_ids?: string[] | null
          created_at?: string
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          product_ids?: string[] | null
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_ids?: string[] | null
          created_at?: string
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          product_ids?: string[] | null
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          alt_text: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          media_type: string
          product_id: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          media_type?: string
          product_id?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          media_type?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          additional_information: string | null
          best_seller: boolean | null
          best_suited_for: string | null
          category_id: string | null
          channel_visibility: string | null
          created_at: string
          description: string | null
          faq: Json | null
          good_for: string | null
          how_to_use: string | null
          hsn_code: string | null
          id: string
          is_active: boolean | null
          jet_video_poster_url: string | null
          jet_video_type: string | null
          jet_video_url: string | null
          key_ingredients: string[] | null
          model: string | null
          name: string
          not_recommended_for: string | null
          not_suitable_for: string | null
          offer_available: boolean | null
          original_price: number | null
          price: number
          product_tags: string[] | null
          rating: number | null
          review_count: number | null
          sale_toggle: boolean | null
          seasons_demand: boolean | null
          sequence: number | null
          size: string | null
          slug: string
          stock_quantity: number | null
          sub_category: string | null
          suitable_for: string | null
          top_trending: boolean | null
          updated_at: string
          video_h_url: string | null
          video_v_url: string | null
        }
        Insert: {
          additional_information?: string | null
          best_seller?: boolean | null
          best_suited_for?: string | null
          category_id?: string | null
          channel_visibility?: string | null
          created_at?: string
          description?: string | null
          faq?: Json | null
          good_for?: string | null
          how_to_use?: string | null
          hsn_code?: string | null
          id?: string
          is_active?: boolean | null
          jet_video_poster_url?: string | null
          jet_video_type?: string | null
          jet_video_url?: string | null
          key_ingredients?: string[] | null
          model?: string | null
          name: string
          not_recommended_for?: string | null
          not_suitable_for?: string | null
          offer_available?: boolean | null
          original_price?: number | null
          price: number
          product_tags?: string[] | null
          rating?: number | null
          review_count?: number | null
          sale_toggle?: boolean | null
          seasons_demand?: boolean | null
          sequence?: number | null
          size?: string | null
          slug: string
          stock_quantity?: number | null
          sub_category?: string | null
          suitable_for?: string | null
          top_trending?: boolean | null
          updated_at?: string
          video_h_url?: string | null
          video_v_url?: string | null
        }
        Update: {
          additional_information?: string | null
          best_seller?: boolean | null
          best_suited_for?: string | null
          category_id?: string | null
          channel_visibility?: string | null
          created_at?: string
          description?: string | null
          faq?: Json | null
          good_for?: string | null
          how_to_use?: string | null
          hsn_code?: string | null
          id?: string
          is_active?: boolean | null
          jet_video_poster_url?: string | null
          jet_video_type?: string | null
          jet_video_url?: string | null
          key_ingredients?: string[] | null
          model?: string | null
          name?: string
          not_recommended_for?: string | null
          not_suitable_for?: string | null
          offer_available?: boolean | null
          original_price?: number | null
          price?: number
          product_tags?: string[] | null
          rating?: number | null
          review_count?: number | null
          sale_toggle?: boolean | null
          seasons_demand?: boolean | null
          sequence?: number | null
          size?: string | null
          slug?: string
          stock_quantity?: number | null
          sub_category?: string | null
          suitable_for?: string | null
          top_trending?: boolean | null
          updated_at?: string
          video_h_url?: string | null
          video_v_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      stores: {
        Row: {
          address: string
          contact: string | null
          created_at: string
          id: string
          images: string[] | null
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          updated_at: string
        }
        Insert: {
          address: string
          contact?: string | null
          created_at?: string
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          address?: string
          contact?: string | null
          created_at?: string
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
