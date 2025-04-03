/**
 * Copyright 2025 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import SwiftUI

struct ContentView: View {
    
    @StateObject private var viewModel = ContentViewModel()
    @State private var responseBot: String = ""
    @State private var isSheetPresented = false
    
    private var backgroundColor: String {
        if viewModel.isFeatureEnabled {
            return viewModel.featureBackground
        }
        return  "#ffffff" // default value if feature is disabled
    }
    
    private var smartBotReply: String {
        if viewModel.isFeatureEnabled && !viewModel.featureContent.isEmpty {
            return viewModel.featureContent
        }
        return Constants.DefaultBotResponse
    }
    
    private var llmMode: String {
        if viewModel.isFeatureEnabled {
            return viewModel.featureModelName
        }
        return "" // default value if feature is disabled
    }
    
    var body: some View {
        
        ZStack() {
            VStack() {
                HStack {
                    Text("Smart Bot")
                        .font(.system(size: 30, weight: .bold, design: .rounded))
                        .foregroundStyle(.blue)
                }
                .padding(.horizontal)
                
                HStack {
                    Text("User id")
                        .font(.system(size: 18, weight: .medium))
                        .foregroundColor(.black)
                        .padding(8)
                    Spacer()
                    
                    Button(action: {
                        viewModel.userId = generateRandomUserId()
                        viewModel.messageText = generateRandomQuery()
                    }) {
                        Text("Assign ")
                            .font(.system(size: 18))
                            .foregroundStyle(.blue)
                        Image(systemName: "shuffle")
                            .font(.system(size: 18))
                            .foregroundStyle(.blue)
                    }
                    .disabled(viewModel.isLoading)
                    .padding(.horizontal)
                }
                .padding(.horizontal, 16)
                
                HStack {
                    TextField("Enter user id or assign one", text: $viewModel.userId)
                        .padding(.horizontal)
                        .font(.system(size: 20))
                        .frame(height: 50)
                        .background(RoundedRectangle(cornerRadius: 8).fill(.gray.opacity(0.2)) .strokeBorder(Color.gray, lineWidth: 1))
                        .padding(.horizontal, 16)
                }
                .padding(.bottom, 12)
                
                HStack {
                    Text("Search a query")
                        .font(.system(size: 18, weight: .medium))
                        .foregroundColor(.black)
                        .padding(8)
                    Spacer()
                }
                .padding(.horizontal, 16)
                
                QueryTextField(placeholder: "Ask anything...",
                               textValue: $viewModel.messageText,
                               isLoading: viewModel.isProcessingQuery,
                               onSend: {
                    let userMessage = viewModel.messageText
                    guard !viewModel.isProcessingQuery && !userMessage.isEmpty else { return }
                    viewModel.processUserQuery(query: userMessage) { result in
                        responseBot = result
                        viewModel.userQuries.append(userMessage)
                        if viewModel.isFeatureEnabled {
                            viewModel.trackModelInteraction(
                                query: userMessage,
                                model: llmMode,
                                response: result
                            )
                        }
                    }
                })
                
                if viewModel.isLoading {
                    ProgressView("Loading feature flags...")
                        .padding()
                } else if let error = viewModel.error {
                    VStack {
                        Text("Error: \(error)")
                            .foregroundColor(.red)
                            .padding()
                        
                        Button("Retry") {
                            viewModel.initializeAndFetchFeatureFlags()
                        }
                        .font(.system(size: 20, weight: .semibold))
                        .foregroundColor(.white)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 8)
                        .background(RoundedRectangle(cornerRadius: 8).fill(.blue))
                    }
                } else {
                    if viewModel.isProcessingQuery {
                        VStack {
                            ProgressView("Processing your query...")
                                .padding()
                        }
                    } else {
                        if !viewModel.userQuries.isEmpty {
                            BotResponseView(
                                modelName: llmMode,
                                responseText: smartBotReply,
                                bgColor: backgroundColor)
                        }
                    }
                    
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Feature Flag Status: ")
                                .font(.system(size: 13))
                                .foregroundColor(.black.opacity(0.7))
                            + Text(viewModel.isFeatureEnabled ? "Enabled" : "Disabled")
                                .font(.system(size: 13))
                                .foregroundColor(viewModel.isFeatureEnabled ? .green : .red)
                        }
                        .padding(.top, 4)
                        
                        Spacer()
                        
                        let userId = viewModel.userId
                        let prefixUserId = userId.count > 8 ? "\(userId.prefix(8))..." : userId
                        Text("User ID: \(prefixUserId)")
                            .font(.system(size: 13))
                            .foregroundColor(.black.opacity(0.7))
                    }
                    .padding(.top, 4)
                    .padding(.horizontal, 16)
                }
                
                VStack {
                    HStack {
                        if viewModel.isInitialized {
                            Button(action: {
                                isSheetPresented.toggle()
                            }) {
                                Text("Show SDK Logs")
                                    .underline()
                                    .foregroundColor(.blue)
                                    .font(.system(size: 16, weight: .medium))
                                
                            }
                            .frame(minHeight: 44)
                        }
                    }
                }
                .padding(.top, 10)
            }
            .padding(2)
            .sheet(isPresented: $isSheetPresented) {
                BottomSheetView()
            }
            .contentShape(Rectangle())
            .onTapGesture {
                hideKeyboard()
            }
            .onAppear {
                viewModel.initializeAndFetchFeatureFlags()
            }
        }
    }
}


struct ButtonFeature: View {
    let title: String
    let fontWeight: Font.Weight
    let fontSize: CGFloat
    let action: () -> Void
    let isDisabled: Bool
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: fontSize, weight: fontWeight))
                .foregroundColor(.white)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .frame(minHeight: 45)
                .disabled(isDisabled)
        }
    }
}

struct BotResponseView: View {
    var modelName: String
    var responseText: String
    var bgColor: String
    var body: some View {
        
        VStack {
            if !modelName.isEmpty {
                HStack {
                    Text("Powered by \(modelName)")
                        .foregroundColor(.black.opacity(0.7))
                        .font(.system(size: 14, weight: .regular, design: .default))
                        .italic()
                        .padding(.top, 8)
                }
            }
            HStack {
                ScrollView {
                    Text(responseText)
                        .font(.system(size: 20, weight: .medium, design: .rounded))
                        .lineSpacing(12)
                        .padding(.vertical, 16)
                        .padding(.horizontal, 16)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
            .background(RoundedRectangle(cornerRadius: 8).fill(Color.hex(bgColor)).strokeBorder(Color.gray, lineWidth: 1))
            .padding(.horizontal, 16)
        }
    }
}

struct QueryTextField: View {
    var placeholder: String
    @Binding var textValue: String
    var isLoading: Bool
    var onSend: () -> Void
    
    var body: some View {
        HStack {
            VStack {
                TextField(placeholder, text: $textValue)
                    .padding(.horizontal)
                    .font(.system(size: 20))
                    .frame(height: 50)
                    .background(RoundedRectangle(cornerRadius: 8).fill(.gray.opacity(0.2)) .strokeBorder(Color.gray, lineWidth: 1))
                    .disabled(true)
            }
            ButtonFeature(title: isLoading ? "Sending..." : "Send",
                          fontWeight: .semibold,
                          fontSize: 20,
                          action: onSend,
                          isDisabled: textValue.isEmpty)
            
            .frame(height: 50)
            .background(RoundedRectangle(cornerRadius: 8).fill((isLoading || textValue.isEmpty) ? .gray : .blue))
            .disabled(isLoading || textValue.isEmpty)
        }
        .padding(.horizontal, 16)
    }
}

struct BottomSheetView: View {
    let sdkData: [String] = FeatureManager.shared.logsSdk
    
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        NavigationView {
            
            ZStack {
                List(sdkData, id: \.self) { item in
                    Text("\(item)")
                        .font(.system(size: 14.0, weight: .regular, design: .monospaced))
                    
                        .foregroundColor(.black)
                        .padding(.vertical, 4)
                        .lineSpacing(8)
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .navigationTitle("SDK Logs")
            .listStyle(.plain)
            .background(.gray.opacity(0.2))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(action: {
                        dismiss()
                    }) {
                        Image(systemName: "multiply")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 24, height: 24, alignment: .center)
                            .tint(.black)
                    }
                }
            }
        }
    }
}


#Preview {
    ContentView()
}
