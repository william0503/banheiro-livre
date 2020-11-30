//Declarando as variáveis
//Sensor 1
int pinSensorPIR1 = 10;
int pinLed1 = 7;

int pinSensorPIR2 = 12;
int pinLed2 = 13;

int idSensor1 = 1;
int idSensor2 = 2;

int valorSensorPIR1 = 0;
int valorSensorPIR2 = 0;


void setup(){
 //Define pinos de entrada e saída
  
  pinMode(pinLed1,OUTPUT);  
  pinMode(pinLed2,OUTPUT);

  pinMode(pinSensorPIR1,INPUT);  
  pinMode(pinSensorPIR2,INPUT);
 
}

void loop() {

 //Lendo o valor dos sensores PIR. 
 //Estes sensores podem assumir 2 valores
 //1 quando detecta algum movimento e 0 quando não detecta.
  
  valorSensorPIR1 = digitalRead(pinSensorPIR1);
  valorSensorPIR2 = digitalRead(pinSensorPIR2);

  Serial.print("Valor PIR1 : ");
  Serial.println(valorSensorPIR1);

 //Verifica se ocorreu detecção de movimentos no sensor 1
  if (valorSensorPIR1 == 1){
    informarPresenca(idSensor1);
  } else {
    desligarLed(idSensor1);
  }
  
  //Verifica se ocorreu detecção de movimentos no sensor 2
  if (valorSensorPIR2 == 1){
    informarPresenca(idSensor2);
  } else {
    desligarLed(idSensor2);
  }
}

//Comunicar presença para serviço externo, o led serve como alternativa visual
void informarPresenca(int sensor){
  ligarLed(sensor);
}
void ligarLed(int idSensor){
  if(idSensor == 1){
    digitalWrite(pinLed1,HIGH);//Ligando o led 1
  }
  
  if(idSensor == 2){
  digitalWrite(pinLed2,HIGH);//Ligando o led 2
  }

}

void desligarLed(int idSensor) {
  if(idSensor == 1){
    digitalWrite(pinLed1, LOW);//Desligando o led 1
  }
  if(idSensor == 2){
    digitalWrite(pinLed2, LOW);//Desligando o led 2
  }
}
