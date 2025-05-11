"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export function SettingsPage() {
  const { t, direction } = useLanguage()

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList>
        <TabsTrigger value="profile">{t("profile")}</TabsTrigger>
        <TabsTrigger value="account">{t("account")}</TabsTrigger>
        <TabsTrigger value="farm">{t("farmSettings")}</TabsTrigger>
        <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("profileSettings")}</CardTitle>
            <CardDescription>{t("profileSettingsDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                defaultValue="Muhammad Hanzala"
                className={direction === "rtl" ? "text-right" : "text-left"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@example.com"
                className={direction === "rtl" ? "text-right" : "text-left"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="3227064186"
                className={direction === "rtl" ? "text-right" : "text-left"}
              />
            </div>
            <Button>{t("saveChanges")}</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="account" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("accountSettings")}</CardTitle>
            <CardDescription>{t("accountSettingsDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">{t("currentPassword")}</Label>
              <Input
                id="current-password"
                type="password"
                className={direction === "rtl" ? "text-right" : "text-left"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">{t("newPassword")}</Label>
              <Input id="new-password" type="password" className={direction === "rtl" ? "text-right" : "text-left"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
              <Input
                id="confirm-password"
                type="password"
                className={direction === "rtl" ? "text-right" : "text-left"}
              />
            </div>
            <Button>{t("changePassword")}</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="farm" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("farmSettings")}</CardTitle>
            <CardDescription>{t("farmSettingsDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farm-name">{t("farmName")}</Label>
              <Input
                id="farm-name"
                defaultValue="Chenab Farms"
                className={direction === "rtl" ? "text-right" : "text-left"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farm-location">{t("farmLocation")}</Label>
              <Input
                id="farm-location"
                defaultValue="123 Rural Road, Countryside"
                className={direction === "rtl" ? "text-right" : "text-left"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farm-size">{t("farmSize")}</Label>
              <Input
                id="farm-size"
                defaultValue="500"
                type="number"
                className={direction === "rtl" ? "text-right" : "text-left"}
              />
            </div>
            <Button>{t("saveChanges")}</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("notificationSettings")}</CardTitle>
            <CardDescription>{t("notificationSettingsDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">{t("emailNotifications")}</Label>
                <p className="text-sm text-muted-foreground">{t("emailNotificationsDescription")}</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">{t("smsNotifications")}</Label>
                <p className="text-sm text-muted-foreground">{t("smsNotificationsDescription")}</p>
              </div>
              <Switch id="sms-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="health-alerts">{t("healthAlertNotifications")}</Label>
                <p className="text-sm text-muted-foreground">{t("healthAlertNotificationsDescription")}</p>
              </div>
              <Switch id="health-alerts" defaultChecked />
            </div>
            <Button>{t("saveChanges")}</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
